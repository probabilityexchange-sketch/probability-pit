import { Hero } from '@/components/layout'
import { ModuleViewer } from '@/components/features/ModuleViewer'

const moduleTitles: Record<string, string> = {
  '1': 'The Casino vs. The Exchange',
  '2': 'The "Inch-Wide, Mile-Deep" Strategy',
  '3': 'The Quant Toolkit',
  '4': 'Execution & Risk Management',
}

export function ModulePage() {
  return <ModuleViewer />
}
