export class HttpServiceError extends Error {
  constructor(public json: Record<string, unknown>, public status: number) {
    super('HTTP error with status ' + status);
  }
}

type ModelValidationError = {
  source: {
    pointer: string;
  };
  detail: string;
};

export class UnprocessableEntityError extends Error {
  public errorsMap: Record<string, string[]>;

  constructor(public errors: ModelValidationError[]) {
    super(`Unprocessable Entity: ${errors.map((e) => e.detail).join(', ')}`);
    this.errorsMap = this.createErrorsMap(errors);
  }

  private createErrorsMap = (
    errors: ModelValidationError[],
  ): Record<string, string[]> =>
    errors.reduce((acc, e) => {
      const {
        source: { pointer },
        detail,
      } = e;
      const key = pointer.replace('/data/attributes/', '');

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(detail);

      return acc;
    }, {} as Record<string, string[]>);
}

export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
  }
}
