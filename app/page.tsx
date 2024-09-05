'use client'

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { HomeIcon, DollarSignIcon, UserIcon, FileIcon, BotIcon, CalendarDaysIcon, MegaphoneIcon, PlusIcon, MapIcon, KanbanIcon, ListIcon, ListOrderedIcon, ArrowUpIcon, ArrowDownIcon, BellIcon, XIcon, BriefcaseIcon, SunIcon, MoonIcon, MessageSquareIcon, PhoneIcon, MailIcon, ChevronDownIcon, ChevronUpIcon, BedSingleIcon, BathIcon, SquareIcon, CalendarIcon, CarIcon, GraduationCapIcon, BuildingIcon, ThermometerIcon, GridIcon, ChevronLeftIcon, ChevronRightIcon, ExternalLinkIcon, StickyNoteIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
const LOGIN_PATTERN = 'LOGIN_'
const WELCOME_MESSAGE = 'WELCOME, ELI'

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
      setIsMoving(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setIsMoving(false)
      }, 100)
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { ...mousePosition, isMoving }
}

export default function Component() {
  const [grid, setGrid] = useState<string[][]>([])
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [welcomeMessage, setWelcomeMessage] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const [showDealManagement, setShowDealManagement] = useState(false)
  const { x, y, isMoving } = useMousePosition()
  const containerRef = useRef<HTMLDivElement>(null)
  const loginButtonRef = useRef<HTMLButtonElement>(null)

  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentPage, setCurrentPage] = useState("properties")
  const [viewMode, setViewMode] = useState("list")
  const [selectedDeal, setSelectedDeal] = useState<any>(null) // Replace `any` with the actual type
  const [editMode, setEditMode] = useState(false)
  const [editedDeal, setEditedDeal] = useState<any>(null) // Replace `any` with the actual type
  const [filterStage, setFilterStage] = useState("All")
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [draggedDeal, setDraggedDeal] = useState<any>(null) // Replace `any` with the actual type
  const [dealViewMode, setDealViewMode] = useState("list")
  const [expandedDealId, setExpandedDealId] = useState<number | null>(null)
  const [showExpandedDetails, setShowExpandedDetails] = useState(false)
  // const [currentDealIndex, setCurrentDealIndex] = useState(0) // Commented out unused variable

  const [dialPadNumber, setDialPadNumber] = useState('+1')
  const [textMessages, setTextMessages] = useState<string[]>([])
  const [currentTextMessage, setCurrentTextMessage] = useState('')
  const [notes, setNotes] = useState('')
  // const [emails, setEmails] = useState<{ id: number; subject: string; sender: string; preview: string; date: string }[]>([
  //   { id: 1, subject: "New Listing Available", sender: "agent@realestate.com", preview: "Check out this new property that just hit the market!", date: "2024-09-01" },
  //   { id: 2, subject: "Offer Update", sender: "client@email.com", preview: "I've reconsidered and would like to increase my offer to...", date: "2024-09-02" },
  //   { id: 3, subject: "Closing Documents", sender: "legal@lawfirm.com", preview: "Please find attached the closing documents for review.", date: "2024-09-03" },
  // ]) // Commented out unused variable

  const [deals, setDeals] = useState(() => {
    const streets = ['Main St', 'Broadway', 'Hillsboro Pike', 'West End Ave', 'Church St', 'Music Row', 'Belmont Blvd', '12th Ave S', '8th Ave S', 'Woodland St']
    const cities = ['Nashville', 'Franklin', 'Brentwood', 'Murfreesboro', 'Hendersonville']
    const stages = ["New", "Attempting", "In Conversation", "Interested", "Appointments", "Post Appointment", "Future Opportunities", "Deal"]
    
    return Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      address: `${Math.floor(Math.random() * 1000) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}, TN`,
      price: `$${(Math.floor(Math.random() * 1000) + 200) * 1000}`,
      date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      stage: stages[Math.floor(Math.random() * stages.length)],
      latitude: 36.1627 + (Math.random() - 0.5) * 0.1,
      longitude: -86.7816 + (Math.random() - 0.5) * 0.1,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      squareFeet: Math.floor(Math.random() * 3000) + 1000,
      bedrooms: Math.floor(Math.random() * 5) + 1,
      bathrooms: Math.floor(Math.random() * 3) + 1,
      yearBuilt: Math.floor(Math.random() * 50) + 1970,
      lotSize: `${(Math.random() * 0.9 + 0.1).toFixed(2)} acres`,
      garageSpaces: Math.floor(Math.random() * 3),
      schoolDistrict: "Metro Nashville Public Schools",
      propertyType: Math.random() > 0.3 ? "Single Family Home" : "Condo",
      heatingCooling: "Central HVAC",
      appliances: ["Refrigerator", "Dishwasher", "Washer", "Dryer"],
      exteriorFeatures: ["Deck", "Fenced Yard", "Sprinkler System"],
      interiorFeatures: ["Hardwood Floors", "Fireplace", "Open Floor Plan"],
      hoa: {
        fee: Math.random() > 0.5 ? `$${Math.floor(Math.random() * 300) + 50}/month` : "N/A",
        includes: ["Common Area Maintenance", "Trash Removal"]
      },
      taxInfo: {
        annualAmount: `$${Math.floor(Math.random() * 5000) + 2000}`,
        year: 2023
      },
      contacts: [
        { name: `Agent ${i + 1}`, email: `agent${i + 1}@example.com`, phone: `615-555-${1000 + i}`, role: "Listing Agent" },
      ],
      communications: [
        { type: "email", date: "2024-07-01", content: "Initial outreach to listing agent" },
      ],
      activities: [
        { type: "viewing", date: "2024-07-10", content: "Property viewing scheduled with potential buyers" },
      ],
    }))
  })

  const [dealPackages, setDealPackages] = useState([
    { 
      id: 1, 
      name: "Downtown Nashville Package", 
      properties: [
        { id: 1, closingDate: "2024-12-15", price: "$450,000" },
        { id: 2, closingDate: "2024-12-20", price: "$750,000" },
      ],
      buyer: { name: "John Doe", email: "john@example.com", phone: "615-555-1234" },
      seller: { name: "Jane Smith", email: "jane@example.com", phone: "615-555-5678" }
    },
    { 
      id: 2, 
      name: "Luxury Homes Collection", 
      properties: [
        { id: 3, closingDate: "2025-01-10", price: "$1,200,000" }
      ],
      buyer: { name: "Alice Brown", email: "alice@example.com", phone: "615-555-3698" },
      seller: { name: "Bob Johnson", email: "bob@example.com", phone: "615-555-2468" }
    },
  ])

  const [actionBarPosition, setActionBarPosition] = useState(50) // Start at the width of the left sidebar
  const [isDragging, setIsDragging] = useState(false)
  const actionBarRef = useRef<HTMLDivElement>(null)
  const [openPopups, setOpenPopups] = useState<string[]>([])

  const initializeGrid = useCallback(() => {
    if (!containerRef.current) return []

    const { clientWidth, clientHeight } = containerRef.current
    const fontSize = 16 // Font size in pixels
    const lineHeight = 1.2 // Line height multiplier

    const cols = Math.ceil(clientWidth / (fontSize * 0.6)) // Assuming monospace font where width is about 60% of height
    const rows = Math.ceil(clientHeight / (fontSize * lineHeight))

    return Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)])
    )
  }, [])

  useEffect(() => {
    setGrid(initializeGrid())
    const handleResize = () => setGrid(initializeGrid())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initializeGrid])

  useEffect(() => {
    if (!containerRef.current || !loginButtonRef.current || isLoggedIn) return

    if (isMoving || isHovering) {
      const newGrid = grid.map((row, i) =>
        row.map((_, j) => {
          if (isHovering) {
            return LOGIN_PATTERN[(i * row.length + j) % LOGIN_PATTERN.length]
          } else {
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
          }
        })
      )
      setGrid(newGrid)
    }
  }, [x, y, isMoving, grid, isHovering, isLoggedIn])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode)
    document.body.classList.toggle('light-mode', !isDarkMode)
  }, [isDarkMode])

  const handleLoginClick = () => {
    setShowLoginForm(true)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Logging in with email: ${email}`)
    setShowLoginForm(false)
    setIsLoggedIn(true)
    setEmail('')
    setPassword('')

    // Fade out effect
    const fadeOutInterval = setInterval(() => {
      setGrid(prevGrid => prevGrid.map(row => row.map(() => ' ')))
    }, 50)

    setTimeout(() => {
      clearInterval(fadeOutInterval)
      setWelcomeMessage('')
      typeWelcomeMessage()
    }, 1000)
  }

  const typeWelcomeMessage = () => {
    let index = 0
    const interval = setInterval(() => {
      if (index < WELCOME_MESSAGE.length) {
        setWelcomeMessage(WELCOME_MESSAGE.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
  }

  // const handleDealTitleChange = (id: number, title: string) => {
  //   // Your logic here
  // } // Commented out unused function

  // const handleAddPropertyToPackage = (packageId: number, property: any) => {
  //   // Your logic here
  // } // Commented out unused function

  // const handleUpdatePropertyInPackage = (packageId: number, propertyId: number, updatedProperty: any) => {
  //   // Your logic here
  // } // Commented out unused function

  // const handleAssignContact = (dealId: number, contact: any) => {
  //   // Your logic here
  // } // Commented out unused function

  useEffect(() => {
    // Your effect logic
  }, [handleDialPadInput]); // Add handleDialPadInput to the dependency array

  return (
    <div>
      {/* Your component JSX */}
    </div>
  )
}

  const handleAddPropertyToPackage = (dealPackageId: number, propertyId: number) => {
    setDealPackages(prevPackages =>
      prevPackages.map(pkg =>
        pkg.id === dealPackageId
          ? { 
              ...pkg, 
              properties: [
                ...pkg.properties, 
                { 
                  id: propertyId, 
                  closingDate: new Date().toISOString().split('T')[0], 
                  price: deals.find(d => d.id === propertyId)?.price || "N/A" 
                }
              ] 
            }
          : pkg
      )
    )
  }

  const handleUpdatePropertyInPackage = (dealPackageId: number, propertyId: number, updates: any) => {
    setDealPackages(prevPackages =>
      prevPackages.map(pkg =>
        pkg.id === dealPackageId
          ? {
              ...pkg,
              properties: pkg.properties.map(prop =>
                prop.id === propertyId ? { ...prop, ...updates } : prop
              )
            }
          : pkg
      )
    )
  }

  const handleAssignContact = (dealPackageId: number, role: string, contact: any) => {
    setDealPackages(prevPackages =>
      prevPackages.map(pkg =>
        pkg.id === dealPackageId
          ? { ...pkg, [role]: contact }
          : pkg
      )
    )
  }

  const calculateProgress = (closingDate: string) => {
    const today = new Date()
    const closing = new Date(closingDate)
    const totalDays = 90 // Assuming a 90-day closing period
    const daysLeft = Math.max(0, Math.ceil((closing.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    return Math.min(100, Math.max(0, ((totalDays - daysLeft) / totalDays) * 100))
  }

  const handleExpandDeal = (deal: any) => {
    setSelectedDeal(deal)
    setCurrentDealIndex(deals.findIndex(d => d.id === deal.id))
    setShowExpandedDetails(true)
  }

  const handlePreviousDeal = () => {
    setCurrentDealIndex((prevIndex) => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : deals.length - 1
      setSelectedDeal(deals[newIndex])
      return newIndex
    })
  }

  const handleNextDeal = () => {
    setCurrentDealIndex((prevIndex) => {
      const newIndex = prevIndex < deals.length - 1 ? prevIndex + 1 : 0
      setSelectedDeal(deals[newIndex])
      return newIndex
    })
  }

  const handleViewOnZillow = () => {
    window.open(`https://www.zillow.com/homes/${selectedDeal.address.replace(/ /g, '-')}`, '_blank')
  }

  const handleViewStreetView = () => {
    window.open(`https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${selectedDeal.latitude},${selectedDeal.longitude}`, '_blank')
  }

  const handleDialPadInput = (digit: string) => {
    if (dialPadNumber.length < 12) {
      setDialPadNumber(prev => prev + digit)
    }
  }

  const handleDialPadDelete = () => {
    setDialPadNumber(prev => {
      if (prev.length > 2) {
        return prev.slice(0, -1)
      }
      return '+1'
    })
  }

  const handleSendTextMessage = () => {
    if (currentTextMessage.trim()) {
      setTextMessages(prev => [...prev, currentTextMessage.trim()])
      setCurrentTextMessage('')
    }
  }

  const handleNotepadInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === actionBarRef.current || (e.target as HTMLElement).closest('.drag-handle')) {
      setIsDragging(true)
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && actionBarRef.current) {
      const sidebarWidth = 50 // Width of the left sidebar
      const actionBarWidth = actionBarRef.current.offsetWidth
      const maxPosition = window.innerWidth - actionBarWidth
      const newPosition = Math.max(sidebarWidth, Math.min(e.clientX - actionBarWidth / 2, maxPosition))
      setActionBarPosition(newPosition)
    }
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const togglePopup = (popupName: string) => {
    setOpenPopups(prev => {
      if (prev.includes(popupName)) {
        return prev.filter(name => name !== popupName)
      } else {
        if (prev.length === 2) {
          return [popupName, prev[0]]
        } else if (prev.length === 1) {
          return [popupName, ...prev]
        } else {
          return [popupName]
        }
      }
    })
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (openPopups.includes('dialPad')) {
        if (e.key >= '0' && e.key <= '9' && dialPadNumber.length < 12) {
          handleDialPadInput(e.key)
        } else if (e.key === 'Backspace' || e.key === 'Delete') {
          handleDialPadDelete()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [openPopups, dialPadNumber])

  if (!isLoggedIn) {
    return (
      <div ref={containerRef} className="relative h-screen w-screen bg-black overflow-hidden font-mono" style={{ fontFamily: "'Source Code Pro', monospace" }}>
        <div className={`absolute inset-0 flex flex-col justify-start items-start leading-tight text-base ${isHovering ? 'text-red-500' : 'text-white'}`}>
          {grid.map((row, i) => (
            <div key={i} className="flex whitespace-nowrap w-full">
              {row.map((char, j) => (
                <span key={`${i}-${j}`} className="inline-block text-center" style={{ width: '0.6em' }}>{char}</span>
              ))}
            </div>
          ))}
        </div>
        <Button 
          ref={loginButtonRef}
          className={`absolute bottom-4 right-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleLoginClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          LOGIN
        </Button>
        {showLoginForm && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-black p-8 rounded-lg border border-white">
              <h2 className="text-white text-2xl mb-4 text-center">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-black text-white border-white focus:ring-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-black text-white border-white focus:ring-white"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button 
                    type="submit"
                    className="flex-1 bg-white text-black hover:bg-gray-200 transition-all duration-300"
                  >
                    Login
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setShowLoginForm(false)}
                    className="flex-1 bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!showDealManagement) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-white text-2xl" style={{ fontFamily: "'Source Code Pro', monospace" }}>
          {welcomeMessage}
          {showCursor && <span className="animate-cursor">█</span>}
        </div>
      </div>
    )
  }

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'}`}>
      <aside className="flex flex-col items-center justify-between w-[50px] bg-[#c00] text-white border-r border-gray-800">
        <div className="space-y-4 mt-4">
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10" onClick={() => setCurrentPage("properties")}>
            <HomeIcon className="h-5 w-5" />
            <span className="sr-only">Properties</span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10">
            <DollarSignIcon className="h-5 w-5" />
            <span className="sr-only">Finances</span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10">
            <UserIcon className="h-5 w-5" />
            <span className="sr-only">Users</span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10">
            <FileIcon className="h-5 w-5" />
            <span className="sr-only">Documents</span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10">
            <BotIcon className="h-5 w-5" />
            <span className="sr-only">AI Assistant</span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10" onClick={() => setViewMode("activities")}>
            <CalendarDaysIcon className="h-5 w-5" />
            <span className="sr-only">Calendar</span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10">
            <MegaphoneIcon className="h-5 w-5" />
            <span className="sr-only">Announcements</span>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10" onClick={() => setCurrentPage("deals")}>
            <BriefcaseIcon className="h-5 w-5" />
            <span className="sr-only">Deals</span>
          </Button>
        </div>
        <div className="mb-4 space-y-4">
          <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10">
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setShowUserProfile(true)} className="hover:bg-[#f0f0f0] hover:text-[#c00] w-10 h-10">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </aside>
      <div className="flex flex-col flex-1">
        <header className={`flex items-center justify-between h-16 px-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
          <h1 className="text-lg font-bold uppercase">{currentPage === "deals" ? "Deals" :  (viewMode === "activities" ? "Activities" : "Properties")}</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <PlusIcon className="h-6 w-6" />
              <span className="sr-only">Add new</span>
            </Button>
            <Input className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} placeholder="Search DEAL CLOSER" />
          </div>
        </header>
        {currentPage === "properties" && viewMode !== "activities" && (
          <div className={`flex items-center justify-between px-4 py-2 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} border-y border-gray-800`}>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md ${viewMode === "map" ? 'text-[#c00]' : ''}`}
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-6 w-6" />
                <span className="sr-only">Map View</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md ${viewMode === "kanban" ? 'text-[#c00]' : ''}`}
                onClick={() => setViewMode("kanban")}
              >
                <KanbanIcon className="h-6 w-6"  />
                <span className="sr-only">Kanban View</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md ${viewMode === "list" ? 'text-[#c00]' : ''}`}
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-6 w-6" />
                <span className="sr-only">List View</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={filterStage} onValueChange={setFilterStage}>
                <SelectTrigger className={`w-[180px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Stages</SelectItem>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md`}>
                <ListOrderedIcon className="h-6 w-6" />
                <span className="sr-only">Sort</span>
              </Button>
              <Button variant="ghost" size="icon" className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md`}>
                <ArrowUpIcon className="h-6 w-6" />
                <ArrowDownIcon className="h-6 w-6" />
                <span className="sr-only">Sort Ascending/Descending</span>
              </Button>
            </div>
          </div>
        )}
        <div className="flex flex-1 overflow-hidden">
          <main className={`flex-1 p-4 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-white text-black'} overflow-auto`}>
            {currentPage === "properties" && viewMode === "kanban" && (
              <div className="flex h-full space-x-4">
                <div className={`flex-1 flex space-x-4 overflow-x-auto ${selectedDeal ? 'w-2/3' : 'w-full'}`}>
                  {stages.map((stage) => (
                    <div
                      key={stage}
                      className={`flex-shrink-0 w-64 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} p-2 rounded-lg`}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, stage)}
                    >
                      <h2 className="text-base font-bold mb-2">{stage}</h2>
                      <div className="space-y-2 min-h-[200px]">
                        {filteredDeals
                          .filter((deal) => deal.stage === stage)
                          .map((deal) => (
                            <div
                              key={deal.id}
                              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg relative p-4 cursor-move group ${draggedDeal?.id === deal.id ? 'opacity-50' : ''}`}
                              draggable="true"
                              onDragStart={(e) => handleDragStart(e, deal)}
                              onDragEnd={handleDragEnd}
                              onClick={() => handleExpandDeal(deal)}
                            >
                              <div className="absolute inset-0 rounded-lg overflow-hidden">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"></div>
                                  <div className="absolute inset-0 animate-fire-tracer">
                                    <div className="absolute h-4 w-4 bg-white rounded-full filter blur-sm"></div>
                                  </div>
                                </div>
                                <div className={`absolute inset-[1px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg`}></div>
                              </div>
                              <div className="relative z-10">
                                <div className="flex items-center justify-between">
                                  <h3 className="text-sm font-bold">{deal.address}</h3>
                                  <div className="flex items-center space-x-2">
                                    <div className="bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center">
                                      <BellIcon className="h-2 w-2 text-white" />
                                    </div>
                                    <div className="bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                                      <UserIcon className="h-2 w-2 text-white" />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-end justify-between mt-2">
                                  <div>
                                    <p className="text-xs text-gray-400">{deal.price}</p>
                                    <p className="text-xs text-gray-400">{deal.date}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {currentPage === "properties" && viewMode === "map" && (
              <div className="h-full">
                <Map
                  initialViewState={{
                    latitude: 36.1627,
                    longitude: -86.7816,
                    zoom: 11
                  }}
                  style={{ width: '100%', height: '100%' }}
                  mapStyle="mapbox://styles/mapbox/dark-v10"
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                >
                  {filteredDeals.map((deal) => (
                    <Marker
                      key={deal.id}
                      latitude={deal.latitude}
                      longitude={deal.longitude}
                      onClick={() => setSelectedDeal(deal)}
                    >
                      <div className={`w-6 h-6 rounded-full ${getStageColor(deal.stage)} flex items-center justify-center text-white text-xs font-bold cursor-pointer`}>
                        {deal.id}
                      </div>
                    </Marker>
                  ))}
                </Map>
              </div>
            )}
            {currentPage === "properties" && viewMode === "list" && (
              <div className="flex h-full">
                <div className={`${selectedDeal ? 'w-[65%]' : 'w-full'} pr-4 overflow-auto`}>
                  <table className="w-full">
                    <thead>
                      <tr className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <th className="px-4 py-2 text-left">
                          <Checkbox
                            checked={selectedProperties.length === filteredDeals.length}
                            onCheckedChange={handleSelectAllProperties}
                          />
                        </th>
                        <th className="px-4 py-2 text-left">Address</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Stage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDeals.map((deal) => (
                        <tr
                          key={deal.id}
                          className={`${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}
                          onClick={() => setSelectedDeal(deal)}
                        >
                          <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedProperties.includes(deal.id)}
                              onCheckedChange={() => handleSelectProperty(deal.id)}
                            />
                          </td>
                          <td className="px-4 py-2">{deal.address}</td>
                          <td className="px-4 py-2">{deal.price}</td>
                          <td className="px-4 py-2">{deal.date}</td>
                          <td className="px-4 py-2">
                            <Badge className={`${getStageColor(deal.stage)} text-white`}>
                              {deal.stage}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {selectedDeal && (
                  <div className="w-[35%] pl-4 border-l border-gray-200 dark:border-gray-700 overflow-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold">{selectedDeal.address}</h2>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedDeal(null)}>
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    {editMode ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" value={editedDeal.price} onChange={(e) => handleInputChange(e, 'price')} />
                          </div>
                          <div>
                            <Label htmlFor="date">Date</Label>
                            <Input id="date" type="date" value={editedDeal.date} onChange={(e) => handleInputChange(e, 'date')} />
                          </div>
                          <div>
                            <Label htmlFor="stage">Stage</Label>
                            <Select value={editedDeal.stage} onValueChange={(value) => handleStageChange(editedDeal.id, value)}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stage" />
                              </SelectTrigger>
                              <SelectContent>
                                {stages.map((stage) => (
                                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <textarea
                            id="description"
                            className={`w-full p-2 rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border border-gray-300`}
                            rows={4}
                            value={editedDeal.description}
                            onChange={(e) => handleInputChange(e, 'description')}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                          <Button onClick={handleSaveDeal}>Save</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Price</Label>
                            <p>{selectedDeal.price}</p>
                          </div>
                          <div>
                            <Label>Date</Label>
                            <p>{selectedDeal.date}</p>
                          </div>
                          <div>
                            <Label>Stage</Label>
                            <Badge className={`${getStageColor(selectedDeal.stage)} text-white`}>
                              {selectedDeal.stage}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Label>Description</Label>
                          <p className="text-sm">{selectedDeal.description}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => handleEditDeal(selectedDeal)}>Edit</Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {currentPage === "properties" && viewMode === "activities" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-4">Recent Activities</h2>
                {deals.flatMap(deal => [
                  ...deal.communications.map(comm => ({
                    ...comm,
                    dealId: deal.id,
                    address: deal.address,
                    type: 'communication'
                  })),
                  ...deal.activities.map(activity => ({
                    ...activity,
                    deal: deal.id,
                    address: deal.address,
                    type: 'activity'
                  }))
                ]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {item.type === 'communication' ? 'Communication' : 'Activity'} for {item.address}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p><strong>Date:</strong> {item.date}</p>
                      <p><strong>Type:</strong> {item.type === 'communication' ? item.type : item.type}</p>
                      <p><strong>Content:</strong> {item.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            {currentPage === "deals" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Deal Packages</h2>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md ${dealViewMode === "list" ? 'text-[#c00]' : ''}`}
                      onClick={() => setDealViewMode("list")}
                    >
                      <ListIcon className="h-6 w-6" />
                      <span className="sr-only">List View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-md ${dealViewMode === "grid" ? 'text-[#c00]' : ''}`}
                      onClick={() => setDealViewMode("grid")}
                    >
                      <GridIcon className="h-6 w-6" />
                      <span className="sr-only">Grid View</span>
                    </Button>
                  </div>
                </div>
                {dealViewMode === "list" ? (
                  <div className="space-y-4">
                    {dealPackages.map((dealPackage) => (
                      <Card key={dealPackage.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <CardHeader>
                          <CardTitle className="flex justify-between items-center">
                            <span>{dealPackage.name}</span>
                            <Button variant="ghost" size="sm" onClick={() => setExpandedDealId(expandedDealId === dealPackage.id ? null : dealPackage.id)}>
                              {expandedDealId === dealPackage.id ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
                            </Button>
                          </CardTitle>
                        </CardHeader>
                        {expandedDealId === dealPackage.id && (
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Properties</h4>
                                <table className="w-full">
                                  <thead>
                                    <tr>
                                      <th className="text-left">Address</th>
                                      <th className="text-left">Closing Date</th>
                                      <th className="text-left">Price</th>
                                      <th className="text-left">Progress</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {dealPackage.properties.map((property) => (
                                      <tr key={property.id}>
                                        <td>{deals.find(d => d.id === property.id)?.address || 'N/A'}</td>
                                        <td>{property.closingDate}</td>
                                        <td>{property.price}</td>
                                        <td>
                                          <Progress value={calculateProgress(property.closingDate)} className="w-full" />
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Contacts</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="font-medium">Buyer</h5>
                                    <p>{dealPackage.buyer.name}</p>
                                    <p>{dealPackage.buyer.email}</p>
                                    <p>{dealPackage.buyer.phone}</p>
                                  </div>
                                  <div>
                                    <h5 className="font-medium">Seller</h5>
                                    <p>{dealPackage.seller.name}</p>
                                    <p>{dealPackage.seller.email}</p>
                                    <p>{dealPackage.seller.phone}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dealPackages.map((dealPackage) => (
                      <Card key={dealPackage.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <CardHeader>
                          <CardTitle>{dealPackage.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p><strong>Properties:</strong> {dealPackage.properties.length}</p>
                            <p><strong>Buyer:</strong> {dealPackage.buyer.name}</p>
                            <p><strong>Seller:</strong> {dealPackage.seller.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
      <Dialog open={showExpandedDetails} onOpenChange={setShowExpandedDetails}>
        <DialogContent className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} max-w-4xl max-h-[90vh] overflow-hidden flex flex-col`}>
          <DialogHeader className="flex justify-between items-center">
            <div className="flex items-center w-full">
              <Button variant="ghost" size="icon" onClick={handlePreviousDeal} className="mr-2">
                <ChevronLeftIcon className="h-6 w-6" />
                <span className="sr-only">Previous property</span>
              </Button>
              <DialogTitle className="text-2xl font-bold flex-grow text-center">{selectedDeal?.address}</DialogTitle>
              <Button variant="ghost" size="icon" onClick={handleNextDeal} className="ml-2">
                <ChevronRightIcon className="h-6 w-6" />
                <span className="sr-only">Next property</span>
              </Button>
            </div>
          </DialogHeader>
          <div className="flex justify-between items-center px-6 py-2 border-b">
            <Select value={selectedDeal?.stage} onValueChange={(value) => handleStageChange(selectedDeal.id, value)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleViewOnZillow}>
                View on Zillow
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleViewStreetView}>
                Street View
                <ExternalLinkIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-grow">
            <div className="p-6 space-y-8">
              <section className="h-64 w-full rounded-lg overflow-hidden">
                <Map
                  initialViewState={{
                    latitude: selectedDeal?.latitude || 36.1627,
                    longitude: selectedDeal?.longitude || -86.7816,
                    zoom: 13
                  }}
                  style={{ width: '100%', height: '100%' }}
                  mapStyle="mapbox://styles/mapbox/dark-v10"
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                >
                  <Marker
                    latitude={selectedDeal?.latitude || 36.1627}
                    longitude={selectedDeal?.longitude || -86.7816}
                  >
                    <div className={`w-6 h-6 rounded-full ${getStageColor(selectedDeal?.stage)} flex items-center justify-center text-white text-xs font-bold`}>
                      {selectedDeal?.id}
                    </div>
                  </Marker>
                </Map>
              </section>

              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="info">Info</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="comps">Comps</TabsTrigger>
                  <TabsTrigger value="deals">Deals</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-8">
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Property Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <BedSingleIcon className="h-5 w-5 mr-2" />
                        <span>{selectedDeal?.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center">
                        <BathIcon className="h-5 w-5 mr-2" />
                        <span>{selectedDeal?.bathrooms} Bathrooms</span>
                      </div>
                      <div className="flex items-center">
                        <SquareIcon className="h-5 w-5 mr-2" />
                        <span>{selectedDeal?.squareFeet} sq ft</span>
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        <span>Built in {selectedDeal?.yearBuilt}</span>
                      </div>
                      <div className="flex items-center">
                        <CarIcon className="h-5 w-5 mr-2" />
                        <span>{selectedDeal?.garageSpaces} Garage Spaces</span>
                      </div>
                      <div className="flex items-center">
                        <GraduationCapIcon className="h-5 w-5 mr-2" />
                        <span>{selectedDeal?.schoolDistrict}</span>
                      </div>
                      <div className="flex items-center">
                        <BuildingIcon className="h-5 w-5 mr-2" />
                        <span>{selectedDeal?.propertyType}</span>
                      </div>
                      <div className="flex items-center">
                        <ThermometerIcon className="h-5 w-5 mr-2" />
                        <span>{selectedDeal?.heatingCooling}</span>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Features</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Appliances</h4>
                        <ul className="list-disc list-inside">
                          {selectedDeal?.appliances.map((appliance: string, index: number) => (
                            <li key={index}>{appliance}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Exterior Features</h4>
                        <ul className="list-disc list-inside">
                          {selectedDeal?.exteriorFeatures.map((feature: string, index: number) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Interior Features</h4>
                        <ul className="list-disc list-inside">
                          {selectedDeal?.interiorFeatures.map((feature: string, index: number) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </section>
                  <section>
                    <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">HOA</h4>
                        <p>Fee: {selectedDeal?.hoa.fee}</p>
                        <p>Includes: {selectedDeal?.hoa.includes.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Tax Information</h4>
                        <p>Annual Amount: {selectedDeal?.taxInfo.annualAmount}</p>
                        <p>Year: {selectedDeal?.taxInfo.year}</p>
                      </div>
                    </div>
                  </section>
                </TabsContent>
                <TabsContent value="contacts" className="space-y-4">
                  {selectedDeal?.contacts.map((contact: any, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{contact.name} - {contact.role}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Email: {contact.email}</p>
                        <p>Phone: {contact.phone}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="comps" className="space-y-4">
                  <p>Comparable properties will be displayed here.</p>
                </TabsContent>
                <TabsContent value="deals" className="space-y-4">
                  <p>Related deals will be displayed here.</p>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Dialog open={showUserProfile} onOpenChange={setShowUserProfile}>
        <DialogContent className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} max-w-md`}>
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User Avatar" />
                <AvatarFallback>EL</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Eli Lilly</h3>
                <p className="text-sm text-gray-500">Real Estate Agent</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Contact Information</h4>
              <p>Email: eli.lilly@example.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Performance</h4>
              <p>Deals Closed: 42</p>
              <p>Revenue Generated: $5.2M</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div
        ref={actionBarRef}
        className="fixed bottom-0 h-[50px] bg-[#c00] rounded-t-lg flex justify-around items-center z-50 cursor-move"
        style={{
          width: '240px',
          left: `${actionBarPosition}px`,
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="drag-handle absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-5 bg-[#c00] rounded-t-lg flex justify-center items-center">
          <div className="w-6 h-3 grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#f0f0f0] hover:text-[#c00] p-2"
          onClick={() => togglePopup('robotChat')}
        >
          <BotIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#f0f0f0] hover:text-[#c00] p-2"
          onClick={() => togglePopup('dialPad')}
        >
          <PhoneIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#f0f0f0] hover:text-[#c00] p-2"
          onClick={() => togglePopup('textMessages')}
        >
          <MessageSquareIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#f0f0f0] hover:text-[#c00] p-2"
          onClick={() => togglePopup('notepad')}
        >
          <StickyNoteIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#f0f0f0] hover:text-[#c00] p-2"
          onClick={() => togglePopup('emailInbox')}
        >
          <MailIcon className="h-4 w-4" />
        </Button>
      </div>
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <div 
          className="flex space-x-4 pointer-events-auto mb-16"
          style={{
            position: 'absolute',
            left: `${actionBarPosition + 120}px`,
            transform: 'translateX(-50%)',
          }}
        >
          {openPopups.map((popupName, index) => (
            <div
              key={popupName}
              className={`w-80 h-96 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-lg shadow-lg p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              {popupName === 'robotChat' && (
                <>
                  <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
                  <div className={`h-72 overflow-y-auto mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded`}>
                    {/* Chat messages would go here */}
                  </div>
                  <Input placeholder="Type your message..." className={isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} />
                </>
              )}
              {popupName === 'dialPad' && (
                <>
                  <h3 className="text-lg font-bold mb-2">Dial Pad</h3>
                  <Input value={dialPadNumber} readOnly className={`mb-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`} />
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
                      <Button key={digit} onClick={() => handleDialPadInput(digit.toString())} className={`rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>{digit}</Button>
                    ))}
                  </div>
                </>
              )}
              {popupName === 'textMessages' && (
                <>
                  <h3 className="text-lg font-bold mb-2">Text Messages</h3>
                  <div className={`h-64 overflow-y-auto mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-2 rounded`}>
                    {textMessages.map((message, index) => (
                      <div key={index} className="mb-2">{message}</div>
                    ))}
                  </div>
                  <div className="flex">
                    <Input
                      value={currentTextMessage}
                      onChange={(e) => setCurrentTextMessage(e.target.value)}
                      placeholder="Type your message..."
                      className={`mr-2 ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
                    />
                    <Button onClick={handleSendTextMessage} className={isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}>Send</Button>
                  </div>
                </>
              )}
              {popupName === 'emailInbox' && (
                <>
                  <h3 className="text-lg font-bold mb-2">Email Inbox</h3>
                  <div className="h-80 overflow-y-auto">
                    {emails.map((email) => (
                      <Card key={email.id} className={`mb-2 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">{email.subject}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{email.sender}</p>
                          <p className="text-sm mt-1">{email.preview}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
              {popupName === 'notepad' && (
                <div className="relative w-full h-full">
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-yellow-900' : 'bg-yellow-100'} rounded-lg shadow-lg transform rotate-1 z-10`}></div>
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-yellow-800' : 'bg-yellow-50'} rounded-lg shadow-lg transform -rotate-1 z-20`}></div>
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg z-30 overflow-hidden`}>
                    <div className={`h-full p-4 ${isDarkMode ? 'bg-[linear-gradient(to_right,transparent_0%,transparent_calc(100%_-_1px),#4a4a4a_calc(100%_-_1px))]' : 'bg-[linear-gradient(to_right,transparent_0%,transparent_calc(100%_-_1px),#e5e5e5_calc(100%_-_1px))]'} bg-[length:24px_24px]`}>
                      <textarea
                        value={notes}
                        onChange={handleNotepadInput}
                        className={`w-full h-full bg-transparent resize-none outline-none leading-[24px] ${isDarkMode ? 'text-white' : 'text-black'}`}
                        placeholder="Click anywhere to start typing..."
                        style={{ lineHeight: '24px' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
