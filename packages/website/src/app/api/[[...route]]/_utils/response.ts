import {Context} from "hono";

export class R<T> {
  private data:T
  private msg: string
  private code: number
  private success: boolean
  constructor(data:any,code:number,msg:string, success:boolean) {
    this.data = data
    this.msg = msg
    this.code = code
    this.success = success
  }
  static success<T>(c:Context,data:T|null = null,msg:string="") {
    return c.json(new R<T>(data,200, msg, true))
  }
  static internalError<T>(c:Context,msg:string="internal error") {
    return c.json(new R<T>(null,500, msg, false))
  }
  static unauthorizedError<T>(c:Context,msg:string="unauthorized") {
    return c.json(new R<T>(null,401, msg, false))
  }
}