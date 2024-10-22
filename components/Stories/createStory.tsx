import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Info, Link, Paperclip, Plus, FileText, Settings2 } from 'lucide-react';

const StoryCreationModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Create Story</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Story</DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-[2fr,1fr] gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Story Title */}
                        <Input
                            placeholder="Story Title"
                            className="text-lg font-medium"
                        />

                        {/* Description Area */}
                        <div>
                            <div className="text-sm text-gray-500 mb-2">Description (Optional)</div>
                            <div className="border rounded-md">
                                <div className="flex items-center border-b p-2 gap-2">
                                    <Tabs defaultValue="write" className="w-full">
                                        <TabsList>
                                            <TabsTrigger value="write">Write</TabsTrigger>
                                            <TabsTrigger value="preview">Preview</TabsTrigger>
                                        </TabsList>
                                    </Tabs>

                                    <div className="flex gap-2 border-l pl-2">
                                        <Button variant="ghost" size="sm">B</Button>
                                        <Button variant="ghost" size="sm">I</Button>
                                        <Button variant="ghost" size="sm">
                                            <Link className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="sm">
                                            <Settings2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <textarea
                                    className="w-full p-4 min-h-[200px] outline-none resize-none"
                                    placeholder="Enter description..."
                                />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="flex items-center gap-2 text-blue-500">
                            <Info className="h-4 w-4" />
                            <span className="text-sm">Markdown tips</span>
                        </div>

                        {/* Tasks Section */}
                        <div>
                            <h3 className="font-medium mb-2">Tasks</h3>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add Task...
                            </Button>
                        </div>

                        {/* Add to Story Section */}
                        <div>
                            <h3 className="font-medium mb-2">Add to Story</h3>
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <Link className="h-4 w-4" />
                                    Relationships...
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <Link className="h-4 w-4" />
                                    External Links...
                                </Button>
                                <Button variant="outline" size="sm" className="flex items-center gap-2">
                                    <Paperclip className="h-4 w-4" />
                                    Attach Files...
                                </Button>
                            </div>
                        </div>

                        {/* Attachments Section */}
                        <div>
                            <h3 className="font-medium mb-2">Attachments</h3>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Attach Files...
                            </Button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        {/* Team */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Team" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="special-grades">Special Grades</SelectItem>
                                <SelectItem value="standard">Standard</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* State */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="State" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todo">To Do</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Epic */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Epic" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Iteration */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Iteration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Type */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="feature">Feature</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Requester */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Requester" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sayantan">Sayantan Naskar</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Owner */}
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Owner" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="nobody">Nobody</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Custom Fields Section */}
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-medium">Custom Fields</h3>
                                <Button variant="ghost" size="sm" className="text-blue-500">
                                    Edit
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Technical Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Shirt Size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Product Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Labels Section */}
                        <div>
                            <h3 className="font-medium mb-2">Labels</h3>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <Plus className="h-4 w-4" />
                                Add Labels...
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                    <Button variant="outline">Discard Draft</Button>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="create-another" className="h-4 w-4" />
                        <label htmlFor="create-another" className="text-sm">Create Another</label>
                        <Button>Create Story</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StoryCreationModal;