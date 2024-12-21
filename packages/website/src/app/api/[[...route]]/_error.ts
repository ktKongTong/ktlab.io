export class BizError extends Error {
  constructor(message: string, public code: number) {
    super(message)
  }
}
export class UnauthorizedError extends BizError {
  constructor(message?: string) {
    super(message??'Unauthorized', 401)
  }
}

export class NotFoundError extends BizError {
  constructor() {
    super('Not Found', 404)
  }
}