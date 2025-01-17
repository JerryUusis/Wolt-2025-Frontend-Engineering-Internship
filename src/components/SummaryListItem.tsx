import { FormatType } from "../utils/types";
import ListItem from "@mui/material/ListItem";

interface SummaryListItemProps {
  description: string;
  rawValue: number;
  formatType: FormatType;
}

const SummaryListItem = ({
  description,
  rawValue,
  formatType,
}: SummaryListItemProps) => {
  const formatRawValue = (formatType: FormatType) => {
    if (formatType === "euro") {
      return new Intl.NumberFormat("de-De", {
        style: "currency",
        currency: "EUR",
      }).format(rawValue / 100);
    } else if (formatType === "meter") {
      return new Intl.NumberFormat("de-DE", {
        style: "unit",
        unit: "meter",
        unitDisplay: "short",
      }).format(rawValue);
    }
  };
  return (
    <>
      <ListItem
        secondaryAction={
          <span data-raw-value={rawValue}>{formatRawValue(formatType)}</span>
        }
      >
        {description}
      </ListItem>
    </>
  );
};

export default SummaryListItem;
