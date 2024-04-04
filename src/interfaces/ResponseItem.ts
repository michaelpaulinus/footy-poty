import type PlayerItem from "@/interfaces/PlayerItem";

export default interface ResponseItem {
  get: string;
  parameters: {};
  errors: [];
  results: number;
  paging: {};
  response: PlayerItem[];
}
