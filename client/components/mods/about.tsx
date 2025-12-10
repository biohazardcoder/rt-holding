import { Button } from "../ui/button"

export const About = () => {
  return (
    <div className=" bg-[#f7f7f7] grid grid-cols-4 px-[10%] gap-8 py-16">
        <div>
            <span className="bg-[#434343] text-white py-2 px-3 font-semibold">About Us</span>
            <p className="mt-4 text-lg">Securing Your <br /> Financial Legacy</p>
        </div>
        <div className="col-span-3">
            <h1 className="text-xl">
                RT Holdings is an international company that was founded in 2013 and carries out multi-sectoral activities. 
                We are one of the leading companies in Uzbekistan that provides high-quality equipment in the fields of construction,
                industry and logistics. We import special equipment from leading Korean and European brands and provide our customers
                with modern, reliable and efficient solutions. The main direction of our company is to import high-quality equipment and
                products from South Korea, China and other global markets, and export them to CIS countries, Vietnam and regional markets.
            </h1>
            <div className="mt-4 flex items-center gap-4">
                <Button className="bg-transparent text-[#0f3d3a] font-semibold border-[#0f3d3a] border  hover:bg-[#0f3d3a] rounded-[3px] hover:text-white cursor-pointer">
                    Profeccional Advisor
                </Button>
                <Button className="bg-transparent text-[#0f3d3a] font-semibold border-[#0f3d3a] border  hover:bg-[#0f3d3a] rounded-[3px] hover:text-white cursor-pointer">
                    Affordable Price
                </Button>
            </div>
        </div>
    </div>
  )
}
