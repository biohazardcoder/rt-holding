import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, CheckCircle, CheckCircle2 } from "lucide-react"

const services = [
    "Maximize Profit & Increase Operational Efficiencies",
    "Business Planning, Operations, & Revenue Growth",
    "Marketing, Sales, Retention, & Customer Experience",
    "Sales & Customer Service Training",
    "Recruiting, Staffing, & Culture",
    "Processes & Workflows",
]

export default function ServicesSection() {
    return (
        <section className="container mx-auto  py-8 md:py-16 px-4">
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                    <span className="bg-[#434343] text-white py-2.5 px-3 font-semibold ">
                        Services Offered
                    </span>

                    <h2 className="text-4xl  font-semibold leading-tight mt-2">
                        Our Consulting and <br /> Coaching Services
                    </h2>
                </div>

                <p className="text-muted-foreground max-w-lg">
                    We help you achieve your goals with customized strategies,
                    practical solutions, and hands-on execution to drive success.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, i) => (
                    <Card key={i} className="relative">
                        <CardContent className="p-6 flex items-center gap-4">
                            <span>
                                <CheckCircle2 size={32} className=" text-emerald-600" />
                            </span>
                            <p className="font-medium leading-snug">{service}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
