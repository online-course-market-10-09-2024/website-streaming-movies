type Props = {
  name: string
}

export default function ButtonAdminOption(props: Props): JSX.Element {
  return (
    <button className="py-2 bg-blue-200 hover:bg-gray-500 hover:text-blue-200">{props.name}</button>
  )
}