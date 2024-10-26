import Calendar from "~components/Calendar/Calendar"
import DateWithEvents from "~components/DateWithEvents"

import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-h-[30rem] plasmo-w-[30rem] plasmo-bg-[#1F2937] plasmo-pt-[0.15rem] ">
      <Calendar />
    </div>
  )
}

export default IndexPopup
