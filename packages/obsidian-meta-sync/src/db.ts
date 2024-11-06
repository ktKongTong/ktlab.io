import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import {DocumentInsert, documents, DocumentSelect} from '@repo/shared/schema'
import {inArray, sql} from "drizzle-orm";
import {PgTable, PgUpdateSetSource} from "drizzle-orm/pg-core";
import {LocalData} from "./interface";



export function conflictUpdateSet<TTable extends PgTable>(
	table: TTable,
	columns: (keyof TTable["_"]["columns"] & keyof TTable)[],
): PgUpdateSetSource<TTable> {
	return Object.assign(
		{},
		...columns.map((k) => ({ [k]: sql.raw(`excluded.${(table[k] as any).name}`) })),
	) as PgUpdateSetSource<TTable>;
}

const equal = (local:LocalData, doc: DocumentSelect) => {
	if(local.type != doc.type) {
		return false
	}
	if(local.type == 'file') {
		if(local.parentId != doc.parentId) {
			return false
		}
		if(local.path != doc.relativePath) {
			return false
		}

		if(local.mdMetadata.title != doc.title) {
			return false
		}

		if(local.type !== "file" || local.mdMetadata.tags?.toString() != doc.tags.toString()) {
			return false
		}
	}


	return local.id == doc.id;
}


const localDataToDBO = (it: LocalData)=> {
	if(it.type == 'file') {
		return {
			id: it.id,
			title: it.mdMetadata.title,
			createdAt: it.mdMetadata.date ?? it.createdAt,
			parentId: it.parentId,
			relativePath: it.path,
			tags: it.mdMetadata.tags ?? [],
			type: it.type,
			mdMetadata: {
				timeliness: it.mdMetadata.timeliness,
				slug: it.mdMetadata.slug,
				wordcount: it.mdMetadata.wordcount,
				excerpt: it.mdMetadata.excerpt,
			}
		}
	}
	return {
		id: it.id,
		title: it.title,
		createdAt: it.createdAt,
		parentId: it.parentId,
		relativePath: it.path,
		tags: [],
		type: it.type,
		mdMetadata: { wordcount: 0, excerpt: "" }
	};
}

const diff = (local:LocalData[],docs:DocumentSelect[]):{
	needUpdate: DocumentInsert[],
	needCreate: DocumentInsert[],
	needDelete: DocumentSelect[],
} => {
	const localNeedCreate = local.filter(item=>!docs.map(it=>it.id).includes(item.id))
	const needCreate = localNeedCreate.map(localDataToDBO)
	const needUpdate = local.filter(item=>{
		const remote = docs.find(it=>it.id == item.id)
		return remote && !equal(item,remote)
	}).map(localDataToDBO)
	const needDelete = docs.filter(item=>!local.map(it=>it.id).includes(item.id))
	return {
		needUpdate,
		needDelete,
		needCreate
	}
}

export const db = (connectionString: string) => {
	const client = postgres(connectionString)
	const db = drizzle(client);

	return {
		async getDocuments():Promise<DocumentSelect[]> {
			const allDocuments = await db.select().from(documents);
			return allDocuments;
		},
		async syncDocs(data: LocalData[]) {
			const allDocuments = await db.select().from(documents);
			const {needUpdate, needDelete, needCreate} = diff(data, allDocuments);
			const newData = needUpdate.concat(needCreate)
			if(newData.length > 0) {
				await db.insert(documents).values(needUpdate.concat(needCreate))
					.onConflictDoUpdate({target: documents.id, set: conflictUpdateSet(documents, [
							"title",
							"relativePath",
							"parentId",
							"tags",
							"type",
							"title",
							"mdMetadata"
						])})
			}
			if(needDelete.length > 0) {
				await db.delete(documents).where(inArray(documents.id, needDelete.map(it=>it.id)))
			}
			return {
				updated: needUpdate,
				deleted: needDelete,
				created: needCreate
			}
		}
	}
}

export type DB = ReturnType<typeof db>
