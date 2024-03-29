import { fetchProductsOutofStock } from "../../../app/utils/actions/products/fetchs"
import NotificationNew from "../../Notification/page";

export default async function Notification() {

    const products = await fetchProductsOutofStock(1);

    if (products && products.length > 0) {
        return(
          <NotificationNew products={products} />
        )
    }

    return(
        <div className="text-white grow cursor-pointer">
          <span className="">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </span>
        </div>
    )
}