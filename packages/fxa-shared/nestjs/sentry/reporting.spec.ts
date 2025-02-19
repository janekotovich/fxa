/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import * as uuid from 'uuid';

import { filterObject } from './reporting';

const FILTERED = '[Filtered]';

describe('filterObject', () => {
  it('should be defined', () => {
    expect(filterObject).toBeDefined();
  });

  // Test Sentry QueryParams filtering types
  it('should filter array of key/value arrays', () => {
    const input = [
      ['foo', uuid.v4().replace(/-/g, '')],
      ['baz', uuid.v4().replace(/-/g, '')],
      ['bar', 'fred'],
    ];
    const expected = [
      ['foo', FILTERED],
      ['baz', FILTERED],
      ['bar', 'fred'],
    ];
    const output = filterObject(input);
    expect(output).toEqual(expected);
  });

  it('should filter an object of key/value pairs', () => {
    const input = {
      foo: uuid.v4().replace(/-/g, ''),
      baz: uuid.v4().replace(/-/g, ''),
      bar: 'fred',
    };
    const expected = {
      foo: FILTERED,
      baz: FILTERED,
      bar: 'fred',
    };
    const output = filterObject(input);
    expect(output).toEqual(expected);
  });

  it('should skip nested arrays that are not valid key/value arrays', () => {
    const input = [
      ['foo', uuid.v4().replace(/-/g, '')],
      ['bar', 'fred'],
      ['fizz', 'buzz', 'parrot'],
    ];
    const expected = [
      ['foo', FILTERED],
      ['bar', 'fred'],
      ['fizz', 'buzz', 'parrot'],
    ];
    const output = filterObject(input);
    expect(output).toEqual(expected);
  });
});
