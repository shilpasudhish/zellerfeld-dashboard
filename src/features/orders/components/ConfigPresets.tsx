import { Button } from "@/components/ui/button";
import { ChevronRight, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applySavedConfig,
  deleteConfig,
  saveConfig,
} from "@/state/saved-configs/SavedConfigSlice";
import type { RootState } from "@/state/store";

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
        <DropdownMenuTrigger className="flex items-center gap-2 bg-black text-white text-sm py-2 px-3 rounded-md cursor-pointer hover:bg-gray-600 transition-all mb-4 ml-4 w-fit">
          <ChevronRight className="w-4 h-4 text-white" />
          {/* <span className="hidden sm:inline">Presets</span> */}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[200px] bg-white shadow-lg rounded-md">
          <DropdownMenuLabel className="px-4 py-2 text-lg font-semibold text-gray-800">
            Saved Configs
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {savedConfigs.map((config) => (
            <DropdownMenuItem
              key={config.id}
              onClick={() => dispatch(applySavedConfig(config.id))}
              className="px-4 py-2 hover:bg-gray-100 flex justify-between items-center transition-colors duration-200"
            >
              <span>{config.name}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown from closing on button click
                  dispatch(deleteConfig(config.id));
                }}
                className="text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setOpenDialog(true)}
            className="px-4 py-2 text-blue-500 hover:bg-blue-50 transition-all"
          >
            Save Current Setup
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog for saving config */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-md bg-white shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Save Config
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Save the current configuration by providing a name.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="font-medium text-gray-800">
                Config Name
              </label>
              <Input
                id="name"
                placeholder="Enter Config Name"
                value={configName}
                onChange={(e) => setConfigName(e.target.value)}
                className="col-span-3 p-3 border-gray-300 rounded-md focus:ring-blue-300 focus:border-blue-300"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleConfigSave}
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-all"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfigPresets;
