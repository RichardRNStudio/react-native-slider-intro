import renderer from 'react-test-renderer'
import DoneButton from '../components/DoneButton'

test('renders correctly', () => {
  const tree = renderer.create(<DoneButton doneLabel={'TestDone'} />).toJSON()
  expect(tree).toMatchSnapshot()
})
