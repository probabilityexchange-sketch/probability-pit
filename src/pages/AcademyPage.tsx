import { Hero } from '@/components/layout'
import { CourseContent } from '@/components/features/CourseContent'

export function AcademyPage() {
  return (
    <>
      <Hero
        badge="Quant Training Protocol"
        title={
          <>
            The <span className="text-[--color-primary-light]">Quant Academy</span>
          </>
        }
        subtitle="Master the mathematical frameworks of elite prediction market participants."
      />
      <CourseContent />
    </>
  )
}
