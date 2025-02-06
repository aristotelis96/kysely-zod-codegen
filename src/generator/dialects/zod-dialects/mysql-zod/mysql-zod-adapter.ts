import { Adapter } from '../../../adapter';
import { ArrayExpressionNode } from '../../../ast/array-expression-node';
import { IdentifierNode } from '../../../ast/identifier-node';
import { ObjectExpressionNode } from '../../../ast/object-expression-node';
import { PropertyNode } from '../../../ast/property-node';
import { RawExpressionNode } from '../../../ast/raw-expression-node';
import { UnionExpressionNode } from '../../../ast/union-expression-node';
import {
  BUFFER_SCHEMA_DEFINITION,
  JSON_SCHEMA_DEFINITION,
  TIMESTAMP_SCHEMA_DEFINITION,
} from '../../../transformer/zod/zod-definitions';

export class MySqlZodAdapter extends Adapter {
  override readonly definitions = {
    decimalSchema: new IdentifierNode('z.coerce.number()'),
    geometrySchema: new UnionExpressionNode([
      new IdentifierNode('lineStringSchema'),
      new IdentifierNode('Point'),
      new IdentifierNode('polygonSchema'),
      new ArrayExpressionNode(new IdentifierNode('geometrySchema')),
    ]),
    jsonSchema: JSON_SCHEMA_DEFINITION,
    lineStringSchema: new ArrayExpressionNode(new IdentifierNode('Point')),
    pointSchema: new ObjectExpressionNode([
      new PropertyNode('x', new IdentifierNode('z.number()')),
      new PropertyNode('y', new IdentifierNode('z.number()')),
    ]),
    polygonSchema: new ArrayExpressionNode(
      new IdentifierNode('lineStringSchema'),
    ),
    bufferSchema: BUFFER_SCHEMA_DEFINITION,
    dateSchema: new RawExpressionNode(
      // eslint-disable-next-line no-useless-escape
      `z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")`,
    ),
    timestampSchema: TIMESTAMP_SCHEMA_DEFINITION,
  };
  // These types have been found through experimentation in Adminer.
  override readonly scalars = {
    bigint: new IdentifierNode('z.number()'),
    binary: new IdentifierNode('bufferSchema'),
    bit: new IdentifierNode('bufferSchema'),
    blob: new IdentifierNode('bufferSchema'),
    char: new IdentifierNode('z.string()'),
    date: new IdentifierNode('dateSchema'),
    datetime: new IdentifierNode('timestampSchema'),
    decimal: new IdentifierNode('decimalSchema'),
    double: new IdentifierNode('z.number()'),
    float: new IdentifierNode('z.number()'),
    geomcollection: new ArrayExpressionNode(
      new IdentifierNode('geometrySchema'),
    ), // Specified as "geometrycollection" in Adminer.
    geometry: new IdentifierNode('geometrySchema'),
    int: new IdentifierNode('z.number()'),
    json: new IdentifierNode('jsonSchema'),
    linestring: new IdentifierNode('lineStringSchema'),
    longblob: new IdentifierNode('bufferSchema'),
    longtext: new IdentifierNode('z.string()'),
    mediumblob: new IdentifierNode('bufferSchema'),
    mediumint: new IdentifierNode('z.number()'),
    mediumtext: new IdentifierNode('z.string()'),
    multilinestring: new ArrayExpressionNode(
      new IdentifierNode('lineStringSchema'),
    ),
    multipoint: new ArrayExpressionNode(new IdentifierNode('pointSchema')),
    multipolygon: new ArrayExpressionNode(new IdentifierNode('polygonSchema')),
    point: new IdentifierNode('pointSchema'),
    polygon: new IdentifierNode('polygonSchema'),
    set: new IdentifierNode('unknown'),
    smallint: new IdentifierNode('z.number()'),
    text: new IdentifierNode('z.string()'),
    time: new IdentifierNode('z.string()'),
    timestamp: new IdentifierNode('timestampSchema'),
    tinyblob: new IdentifierNode('bufferSchema'),
    tinyint: new IdentifierNode('z.number()'),
    tinytext: new IdentifierNode('z.string()'),
    varbinary: new IdentifierNode('bufferSchema'),
    varchar: new IdentifierNode('z.string()'),
    year: new IdentifierNode('z.number()'),
  };
}
