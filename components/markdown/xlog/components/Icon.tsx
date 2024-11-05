import dynamic from 'next/dynamic'
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import type {Element} from "hast";

const Icon = (props: {
                children: string
                node: Element
}) => {
  const {node} = props;
  const name = node.properties['name'] as keyof typeof dynamicIconImports
  const LucideIcon = dynamic(dynamicIconImports[name])
  return <LucideIcon className={'md-icon'}/>;
};

export default Icon;