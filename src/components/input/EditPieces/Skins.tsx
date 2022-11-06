import React from "react";
import { Operator, OpJsonModule, OpJsonObj, Skin } from "../../../types/operator";
import skinJson from "data/skins.json";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { changeSkin } from "../../../util/changeOperator";

interface Props {
  op: Operator;
  onChange: (newOperator: Operator) => void;
}
const Skins = ((props: Props) => {
  const { op, onChange } = props;
  const opSkins: Skin[] = skinJson[op.id as keyof typeof skinJson];

  return (
    <Box sx={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      justifyContent: "space-around",
      gap: "4px",
    }}>
      {opSkins.sort((a, b) => a.sortId - b.sortId).map((skin: Skin, i: number) => {
        const disabled = !op.owned || (skin.sortId === -1 && op.promotion < 2) || (skin.sortId === -2 && op.promotion < 1);
        return (
          <Tooltip title={skin.skinName ?? `Default Elite ${skin.sortId + 3}`} arrow describeChild key={`skn${i}`}>
            <div>
              <Button
                className={op.skin === skin.avatarId.replace('#', "%23") ? "active" : "inactive"}
                onClick={() => onChange(changeSkin(op, skin.avatarId.replace('#', "%23")))}
                disabled={disabled}
              >
                <Box
                  component="img"
                  width="100%"
                  height="100%"
                  src={`/img/avatars/${skin.avatarId.replace('#', "%23")}.png`}
                />
              </Button>
            </div>
          </Tooltip>
        );
      })}
    </Box>
  )
})
export default Skins;