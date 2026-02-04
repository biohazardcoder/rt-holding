import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const steps = [
    {
        title: "Intro Consultation and Basic Research",
        description: "Understanding your business and goals",
    },
    {
        title: "Discovery",
        description:
            "Competitive analysis, identifying opportunities, and key insights",
    },
    {
        title: "Build Plan",
        description: "Crafting a tailored strategy for success",
    },
    {
        title: "Execute",
        description: "Implementing the plan with precision and focus",
    },
]

export default function BusinessProcessSection() {
    return (
        <section className="bg-[#f6f7f3] py-8 md:py-16 px-4">
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div>
                    <span className="bg-[#434343] text-white py-2.5 px-3 font-semibold ">
                        Our Process
                    </span>

                    <p className="text-muted-foreground max-w-xl mb-10 mt-4">
                        We serve Northwest Arkansas, the entire state of Arkansas, and
                        neighboring states, with consulting clients nationwide. Our
                        flexible approach allows us to work with clients through
                        in-person meetings, phone calls, webinars, emails, texts, and
                        messaging.
                    </p>

                    <div className="space-y-8">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="relative">
                                    <span className="block w-px h-full bg-muted" />
                                </div>

                                <div>
                                    <h4 className="font-medium text-lg mb-1">
                                        {step.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <div className="relative overflow-hidden rounded-xl">
                        <Image
                            src="/business.jpg"
                            alt="Business consulting"
                            width={600}
                            height={200}
                            className="object-cover h-124"
                        />
                    </div>

                    <div className="absolute bottom-6 right-6 flex items-end gap-2">
                        <span className="h-20 w-3 bg-white/40 rounded-sm" />
                        <span className="h-28 w-3 bg-white/60 rounded-sm" />
                        <span className="h-36 w-3 bg-white/80 rounded-sm" />
                    </div>
                </div>
            </div>
        </section>
    )
}
