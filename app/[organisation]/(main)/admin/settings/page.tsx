'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Building2, Globe, Mail, Phone, MapPin, Upload } from 'lucide-react'

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Organization name must be at least 2 characters.",
    }),
    domain: z.string().url({
        message: "Please enter a valid URL.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    phone: z.string().min(10, {
        message: "Please enter a valid phone number.",
    }),
    address: z.string().min(5, {
        message: "Please enter a valid address.",
    }),
    description: z.string().max(500, {
        message: "Description must not exceed 500 characters.",
    }),
})

export default function AdminSettings() {
    const [logo, setLogo] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "Acme Inc.",
            domain: "https://acme.com",
            email: "admin@acme.com",
            phone: "+1 (555) 123-4567",
            address: "123 Main St, Anytown, AN 12345",
            description: "Acme Inc. is a leading provider of innovative solutions for businesses worldwide.",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // Here you would typically send this data to your backend
    }

    const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setLogo(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="appearance">Appearance</TabsTrigger>
                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization Details</CardTitle>
                                <CardDescription>Manage your organization&apos;s general information.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }: any) => (
                                                <FormItem>
                                                    <FormLabel>Organization Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Acme Inc." {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        This is your organization&apos;s visible name.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="domain"
                                            render={({ field }: any) => (
                                                <FormItem>
                                                    <FormLabel>Domain</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://acme.com" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        The primary domain for your organization.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }: any) => (
                                                <FormItem>
                                                    <FormLabel>Contact Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="admin@acme.com" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        The primary contact email for your organization.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }: any) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+1 (555) 123-4567" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        The primary contact phone number for your organization.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="address"
                                            render={({ field }: any) => (
                                                <FormItem>
                                                    <FormLabel>Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="123 Main St, Anytown, AN 12345" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        The primary address of your organization.
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }: any) => (
                                                <FormItem>
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us about your organization"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        A brief description of your organization (max 500 characters).
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Save Changes</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="appearance">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance Settings</CardTitle>
                                <CardDescription>Customize your organization&apos;s visual identity.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="logo">Organization Logo</Label>
                                    <div className="flex items-center space-x-4">
                                        <Avatar className="w-20 h-20">
                                            <AvatarImage src={logo || '/placeholder.svg?height=80&width=80'} alt="Organization Logo" />
                                            <AvatarFallback>LOGO</AvatarFallback>
                                        </Avatar>
                                        <Label htmlFor="logo-upload" className="cursor-pointer">
                                            <div className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                                                <Upload className="w-4 h-4" />
                                                <span>Upload New Logo</span>
                                            </div>
                                            <Input
                                                id="logo-upload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleLogoUpload}
                                            />
                                        </Label>
                                    </div>
                                </div>
                                {/* Add more appearance settings here */}
                            </CardContent>
                            <CardFooter>
                                <Button>Save Appearance</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="advanced">
                        <Card>
                            <CardHeader>
                                <CardTitle>Advanced Settings</CardTitle>
                                <CardDescription>Configure advanced options for your organization.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Add advanced settings here */}
                                <p>Advanced settings content goes here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}