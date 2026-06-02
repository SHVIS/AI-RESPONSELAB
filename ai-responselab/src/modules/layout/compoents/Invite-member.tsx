import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Hint } from "@/components/ui/hint";
import { UserPlusIcon } from "@phosphor-icons/react/dist/ssr";
const InviteMember=()=>{
return (
    <>   <DropdownMenu>

     <Hint label="Invite Member">
        <DropdownMenuTrigger asChild>
          <Button className="border border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300">
            <UserPlusIcon className="size-4 text-emerald-400" />
          </Button>
        </DropdownMenuTrigger>
      </Hint>
      </DropdownMenu>
    </>
);
}
export default InviteMember;