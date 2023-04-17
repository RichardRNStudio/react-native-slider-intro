import renderer from 'react-test-renderer'
import Item from '../components/Item'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Item
        index={0}
        backgroundColor={'white'}
        title={'Test Item'}
        text={'Test item text'}
        link={'https://rnstudio.hu'}
        activeLanguage={'en'}
        slideMaxHeightPercent={0.9}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
