import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  applySavedConfig,
  deleteConfig,
  saveConfig,
} from "@/state/saved-configs/SavedConfigSlice";
import type { RootState } from "@/state/store";
import { Pocket, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ConfigPresets = () => {
  const { savedConfigs, currentConfig } = useSelector(
    (state: RootState) => state.savedConfigs
  );
  const [configName, setConfigName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleConfigSave = () => {
    const config = {
      name: configName,
      filters: currentConfig.filters,
      sort: currentConfig.sort,
    };
    dispatch(saveConfig(config));
    setOpenDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Pocket /> Presets
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Saved Configs</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {savedConfigs.map((config) => (
            <DropdownMenuItem
              onClick={() => {
                dispatch(applySavedConfig(config.id));
              }}
              key={config.id}
            >
              <div className="item flex justify-between">
                <span className="pr-2">{config.name}</span>
                <Button
                  onClick={() => dispatch(deleteConfig(config.id))}
                  variant="outline"
                  size="icon"
                >
                  <Trash2 />
                </Button>
              </div>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            Save Current setup?
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Config</DialogTitle>
            <DialogDescription>
              Save the config by providing the required information.
            </DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                Config Name
                <Input
                  id="name"
                  placeholder="Config Name"
                  value={configName}
                  onChange={(e) => setConfigName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit" onClick={handleConfigSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfigPresets;
