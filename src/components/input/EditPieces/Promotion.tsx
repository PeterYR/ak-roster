import React from "react";
import { Operator } from "../../../types/operator";
import { Box, IconButton } from "@mui/material";
import { MAX_PROMOTION_BY_RARITY } from "../../../util/changeOperator";

const br = (opRarity: number, pot: number) => {
  const r = 4;
  if (pot === 0) return `${r}px 0px 0px ${r}px`;
  else if (pot === MAX_PROMOTION_BY_RARITY[opRarity]) return `0px ${r}px ${r}px 0px`;
  else return "0";
}

interface Props {
  op: Operator;
  onChange: (
    operatorId: string,
    property: string,
    value: number | boolean
  ) => void;
}
const Promotion = ((props: Props) => {
  const { op, onChange } = props;
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
    }}>
      {[...Array(MAX_PROMOTION_BY_RARITY[op.rarity] + 1)].map((_, i) =>
        <IconButton
          sx={{ borderRadius: br(op.rarity, i) }}
          className={op.promotion === i ? "active" : "inactive"}
          onClick={() => onChange(op.id, "promotion", i)}
          disabled={!op.owned}
          key={`pro${i + 1}`}
        >
          <img
            width="32px"
            src={`/img/elite/${i}.png`}
            alt={`Elite ${i} Button`}
          />
        </IconButton>
      )}
    </Box>
  )
})
export default Promotion;