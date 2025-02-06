import { MysqlIntrospectorDialect } from '../../../../introspector';
import type { GeneratorDialect } from '../../../dialect';
import { MySqlZodAdapter } from './mysql-zod-adapter';

export class MySqlZodDialect
  extends MysqlIntrospectorDialect
  implements GeneratorDialect
{
  readonly adapter = new MySqlZodAdapter();
}
