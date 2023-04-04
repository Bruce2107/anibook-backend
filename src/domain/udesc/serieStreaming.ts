export class SerieStreaming {
  idStreaming: number;
  idSerie: number;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
