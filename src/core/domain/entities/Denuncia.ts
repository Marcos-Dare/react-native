import { GeoCoordinates } from "../value-objects/GeoCoordinates";
import { Photo } from "../value-objects/Photo";

export type StatusDenuncia = "pendente" | "em_analise" | "resolvida" | "rejeitada";

export class Denuncia {
  readonly id: string;
  readonly userId: string;
  readonly foto: Photo;
  readonly descricao: string | null;
  readonly localizacao: GeoCoordinates;
  readonly status: StatusDenuncia;
  readonly dataHora: Date;

  private constructor(props: {
    id: string;
    userId: string;
    foto: Photo;
    descricao: string | null;
    localizacao: GeoCoordinates;
    status: StatusDenuncia;
    dataHora: Date;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.foto = props.foto;
    this.descricao = props.descricao;
    this.localizacao = props.localizacao;
    this.status = props.status;
    this.dataHora = props.dataHora;
  }

  static create(
    props: {
      id: string;
      userId: string;
      foto: Photo;
      localizacao: GeoCoordinates;
      descricao?: string;
    }
  ): Denuncia {
    return new Denuncia({
      ...props,
      descricao: props.descricao ?? null,
      status: "pendente",
      dataHora: new Date(),
    });
  }

  // Métodos de mudança de status
  public iniciarAnalise(): Denuncia {
    return new Denuncia({ ...this, status: "em_analise" });
  }

  public resolver(): Denuncia {
    return new Denuncia({ ...this, status: "resolvida" });
  }

  public rejeitar(): Denuncia {
    return new Denuncia({ ...this, status: "rejeitada" });
  }

  // Métodos de atualização de dados (que estavam faltando)
  public updateDescricao(novaDescricao: string | null): Denuncia {
    return new Denuncia({ ...this, descricao: novaDescricao });
  }

  public updateLocalizacao(novaLocalizacao: GeoCoordinates): Denuncia {
    return new Denuncia({ ...this, localizacao: novaLocalizacao });
  }
}