export class HttpError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = new.target.name;
  }
}

export class RecipeNotFoundError extends HttpError {
  constructor(id: number) {
    super(`Rezept mit ID ${id} nicht gefunden`, 404);
  }
}

export class ValidationError extends HttpError {
  constructor(message: string) {
    super(message, 400);
  }
}