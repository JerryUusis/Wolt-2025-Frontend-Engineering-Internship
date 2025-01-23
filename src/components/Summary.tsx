import { OutputObject } from "../utils/types";
import List from "@mui/material/List";
import SummaryListItem from "./SummaryListItem";
import Divider from "@mui/material/Divider";

const Summary = ({
  cartValue,
  smallOrderSurcharge,
  deliveryDistance,
  deliveryFee,
  totalPrice,
}: OutputObject) => {
  return (
    <List>
      <SummaryListItem
        description="Cart value"
        rawValue={cartValue}
        formatType="euro"
      />
      <SummaryListItem
        description="Delivery fee"
        rawValue={deliveryFee}
        formatType="euro"
      />
      <SummaryListItem
        description="Delivery distance"
        rawValue={deliveryDistance}
        formatType="meter"
      />
      <SummaryListItem
        description="Small order surcharge"
        rawValue={smallOrderSurcharge}
        formatType="euro"
      />
      <SummaryListItem
        description="Cart value"
        rawValue={cartValue}
        formatType="euro"
      />
      <Divider />
      <SummaryListItem
        description="Total price"
        rawValue={totalPrice}
        formatType="euro"
      />
    </List>
  );
};

export default Summary;
