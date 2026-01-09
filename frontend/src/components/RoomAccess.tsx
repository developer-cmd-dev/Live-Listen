import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import {LockIcon, MessageSquare } from "lucide-react"
import { useAuthentication } from "@/store/zustand"

export function RoomAccess() {


    const {userData} = useAuthentication((state)=>state)








    return (
        <div className=" flex flex-1 h-full  w-full max-w-full flex-col ">
            <Tabs defaultValue="create-room" className="h-full">
                <TabsList>
                    <TabsTrigger value="create-room">Create Room</TabsTrigger>
                    <TabsTrigger value="join-room">Join Room</TabsTrigger>
                </TabsList>
                <TabsContent value="create-room" className="border-none">
                    <Card  className="h-full">
                        <CardContent className=" grid gap-6">
                            <ToggleGroup  type="multiple" variant="outline" spacing={2} size="sm">
                                <ToggleGroupItem
                                    title="Enable private"
                                    value="private"
                                    aria-label="toggle private"
                                    className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-white data-[state=on]:*:[svg]:stroke-black"
                                >
                                    <LockIcon />
                                    Private
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                title="Enable chat"
                                    value="chat"
                                    aria-label="toggle chat"
                                    className="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
                                >
                                    <MessageSquare />
                                    Chat
                                </ToggleGroupItem>
                            

                                <Input type="number"  placeholder="max friends 10" min={``} max={10}/>
                            </ToggleGroup>
                            <div className="grid gap-3">
                                <Label  htmlFor="tabs-demo-username">Username</Label>
                                <Input disabled id="tabs-demo-username" defaultValue={userData?.email} placeholder={userData?.email} />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Create Room</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>



                <TabsContent className="" value="join-room">
                    <Card className="h-full">

                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="tabs-demo-new">Enter Room Code</Label>
                                <Input id="tabs-demo-new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Join Room</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
