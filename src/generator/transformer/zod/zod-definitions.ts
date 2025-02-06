import type { DefinitionNode } from '../../ast/definition-node';
import { IdentifierNode } from '../../ast/identifier-node';
import { RawExpressionNode } from '../../ast/raw-expression-node';
import { UnionExpressionNode } from '../../ast/union-expression-node';

export const GLOBAL_ZOD_DEFINITIONS = {};

export const JSON_SCHEMA_DEFINITION: DefinitionNode = new RawExpressionNode(
  'z.object({}).catchall(z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(z.any())]))',
);

export const BUFFER_SCHEMA_DEFINITION: DefinitionNode = new RawExpressionNode(`
          z.custom<Buffer>((data) => {
            return Buffer.isBuffer(data);
          }, {
            message: "Invalid buffer", // Optional error message
          });`);

export const TIMESTAMP_SCHEMA_DEFINITION = new UnionExpressionNode([
  new IdentifierNode('z.coerce.date()'),
  new IdentifierNode('z.string()'),
]);
