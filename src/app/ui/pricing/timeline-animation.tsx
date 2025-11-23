import { motion, useInView } from "motion/react"
import type React from "react"
import type { Variants } from "motion/react"

interface BaseTimelineContentProps {
  children?: React.ReactNode
  animationNum: number
  className?: string
  timelineRef: React.RefObject<HTMLElement | null>
  customVariants?: Variants
  once?: boolean
}

type TimelineContentProps<T extends keyof HTMLElementTagNameMap = "div"> = BaseTimelineContentProps & {
  as?: T
}

export const TimelineContent = <T extends keyof HTMLElementTagNameMap = "div">({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  customVariants,
  once = false,
}: TimelineContentProps<T>) => {
  const defaultSequenceVariants: Variants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(20px)",
      y: 0,
      opacity: 0,
    },
  }

  // Use custom variants if provided, otherwise use default
  const sequenceVariants = customVariants || defaultSequenceVariants

  const isInView = useInView(timelineRef, {
    once
  })

  const tag = as || "div"
  const MotionTag = motion[tag as keyof typeof motion] as typeof motion.div

  return (
    <MotionTag
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={animationNum}
      variants={sequenceVariants}
      className={className}
    >
      {children}
    </MotionTag>
  )
}