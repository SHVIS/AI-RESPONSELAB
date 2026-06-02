import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Hint } from "@/components/ui/hint";
import { User2 } from "lucide-react";
const Workspace = () => {
    return (
        <>   <DropdownMenu>

            <Hint label="WorkSpace">
                <DropdownMenuTrigger asChild>
                    <Button className="border border-purple-400 bg-purple-400/10 hover:bg-purple-600/20 text-purple-400 hover:text-purple-700">
                        <User2 className="size-4 text-purple-400" />
                        Personal Workspace
                    </Button>
                </DropdownMenuTrigger>
            </Hint>
        </DropdownMenu></>
    );
}
export default Workspace;