// import { describe, expect, it } from './test_utils.js'
// import { resolvers } from '../src/resolvers.js'
// import { DiffItem, FsNodeType } from '../src/ogm-types.js'
// import { DiffRecord, DiffStatus, NodeType } from '../src/diff/types.js'

// const fakeDriver = {} as any;
// const fakeOgm = {} as any;

// const { DiffItem } = resolvers(fakeDriver, fakeOgm)

// describe('resolver tests', () => {
//     describe('DiffItem', () => {

//         it('can be called', () => {
//             // arrange
//             const givenParent: DiffRecord = {
//                 new_props: { hash: 'abc' },
//                 old_props: { hash: 'cde' },
//                 path: 'somePath',
//                 status: DiffStatus.NEW,
//                 type: NodeType.Blob,
//             }
//             const expectedResult = FsNodeType.Blob;

//             // act
//             const result = DiffItem.type(givenParent)

//             // assert
//             expect(result).toEqual(expectedResult)
//         })
//     })
// })
