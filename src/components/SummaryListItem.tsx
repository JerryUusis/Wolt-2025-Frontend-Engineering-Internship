import { formatRawValue } from "../utils/library";
import { FormatType } from "../utils/types";
import ListItem from "@mui/material/ListItem";

export interface SummaryListItemProps {
  description: string;
  rawValue: number;
  formatType: FormatType;
}

const SummaryListItem = ({
  description,
  rawValue,
  formatType,
}: SummaryListItemProps) => {
  return (
    <>
      <ListItem
        secondaryAction={
          <span data-raw-value={rawValue}>
            {formatRawValue(rawValue, formatType)}
          </span>
        }
      >
        {description}
      </ListItem>
    </>
  );
};

export default SummaryListItem;
