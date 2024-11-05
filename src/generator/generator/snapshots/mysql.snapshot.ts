/**
 * This file was generated by kysely-zod-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface FooBar {
  false: number;
  id: Generated<number>;
  overridden: "OVERRIDDEN";
  true: number;
  userStatus: "CONFIRMED" | "UNCONFIRMED" | null;
}

export interface DB {
  fooBar: FooBar;
}
