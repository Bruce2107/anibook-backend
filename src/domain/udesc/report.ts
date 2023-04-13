export class StudioSerie {
  serie: string;
  studio: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}

export class StreamingSerie {
  serie: string;
  streaming: string;

  constructor({ ...props }) {
    Object.assign(this, props);
  }
}
