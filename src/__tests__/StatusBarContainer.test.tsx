import renderer from 'react-test-renderer'
import StatusBarContainer from '../components/StatusBarContainer'

test('renders correctly', () => {
  const tree = renderer.create(<StatusBarContainer backgroundColor={'black'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
