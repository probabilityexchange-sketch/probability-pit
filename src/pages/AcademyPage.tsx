import { Hero } from '@/components/layout'
import { CourseContent } from '@/components/features/CourseContent'

export function AcademyPage() {
  return (
    <>
      <Hero
        badge="Quant Training Protocol"
        title={
          <>
            The <span className="text-primary">Quant Academy</span>
          </>
        }
        subtitle="Master the mathematical frameworks of elite prediction market participants through structured, battle-tested modules."
      />
      <CourseContent />
    </>
  )
}
