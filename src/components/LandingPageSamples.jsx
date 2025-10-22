import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { 
  Rocket, 
  Star, 
  Clock, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Trophy,
  Target,
  BarChart3,
  ShoppingCart,
  Building,
  Gamepad2,
  Heart,
  GraduationCap
} from 'lucide-react'

const plugCategories = {
  sports: {
    name: 'Sports Analytics',
    icon: Trophy,
    color: 'from-orange-500 to-red-600',
    description: 'Advanced sports intelligence and analytics platforms',
    plugs: [
      {
        id: 'recruiting-tracker',
        name: 'Recruiting Intelligence Hub',
        description: 'Complete recruiting management with player grading and transfer portal integration',
        features: ['Player Grading System', 'Coaching Carousel Tracking', 'Transfer Portal Monitor', 'Perform Platform'],
        complexity: 'Medium',
        estimatedTime: '3-5 days',
        startingPrice: '$19.99',
        pricingTiers: {
          coach: '$19.99/month',
          department: '$79.99/month',
          university: '$149.99/month'
        },
        rating: 4.9,
        deployments: 127,
        category: 'Sports Analytics'
      },
      {
        id: 'team-analytics',
        name: 'Team Performance Dashboard',
        description: 'Advanced team analytics with win probability and recruiting class impact',
        features: ['Team Grading Algorithm', 'Win Probability Calculator', 'Strength of Schedule', 'Recruiting Impact'],
        complexity: 'Complex',
        estimatedTime: '5-8 days',
        startingPrice: '$79.99',
        pricingTiers: {
          coach: '$79.99/month',
          department: '$149.99/month',
          university: '$299.99/month'
        },
        rating: 4.8,
        deployments: 89,
        category: 'Sports Analytics'
      },
      {
        id: 'fan-engagement',
        name: 'Fan Engagement Platform',
        description: 'Interactive fan experience with real-time stats and social features',
        features: ['Live Game Stats', 'Fan Polls', 'Social Integration', 'Loyalty Rewards'],
        complexity: 'Medium',
        estimatedTime: '4-6 days',
        startingPrice: '$19.99',
        pricingTiers: {
          coach: '$19.99/month',
          department: '$79.99/month',
          university: '$149.99/month'
        },
        rating: 4.7,
        deployments: 156,
        category: 'Sports Analytics'
      }
    ]
  },
  business: {
    name: 'Business Operations',
    icon: Building,
    color: 'from-blue-500 to-purple-600',
    description: 'Streamline operations with AI-powered business solutions',
    plugs: [
      {
        id: 'crm-system',
        name: 'AI-Powered CRM',
        description: 'Complete customer relationship management with AI insights and automation',
        features: ['Contact Management', 'Sales Pipeline', 'AI Lead Scoring', 'Email Automation'],
        complexity: 'Complex',
        estimatedTime: '5-7 days',
        startingPrice: '$79.99',
        pricingTiers: {
          professional: '$79.99/month',
          organization: '$149.99/month',
          enterprise: '$299.99/month'
        },
        rating: 4.9,
        deployments: 234,
        category: 'Business Operations'
      },
      {
        id: 'project-manager',
        name: 'Project Management Suite',
        description: 'Comprehensive project tracking with team collaboration and reporting',
        features: ['Task Management', 'Team Collaboration', 'Time Tracking', 'Advanced Reporting'],
        complexity: 'Medium',
        estimatedTime: '3-5 days',
        startingPrice: '$19.99',
        pricingTiers: {
          professional: '$19.99/month',
          organization: '$79.99/month',
          enterprise: '$149.99/month'
        },
        rating: 4.8,
        deployments: 178,
        category: 'Business Operations'
      },
      {
        id: 'inventory-system',
        name: 'Smart Inventory Manager',
        description: 'AI-driven inventory optimization with predictive analytics',
        features: ['Real-time Tracking', 'Predictive Analytics', 'Automated Reordering', 'Supplier Integration'],
        complexity: 'Complex',
        estimatedTime: '6-8 days',
        startingPrice: '$79.99',
        pricingTiers: {
          professional: '$79.99/month',
          organization: '$149.99/month',
          enterprise: '$299.99/month'
        },
        rating: 4.7,
        deployments: 92,
        category: 'Business Operations'
      }
    ]
  },
  ecommerce: {
    name: 'E-Commerce',
    icon: ShoppingCart,
    color: 'from-green-500 to-teal-600',
    description: 'Next-generation e-commerce platforms and marketplaces',
    plugs: [
      {
        id: 'marketplace',
        name: 'Multi-Vendor Marketplace',
        description: 'Complete marketplace platform with vendor management and analytics',
        features: ['Vendor Dashboard', 'Payment Processing', 'Order Management', 'Analytics Suite'],
        complexity: 'Enterprise',
        estimatedTime: '8-12 days',
        startingPrice: '$149.99',
        pricingTiers: {
          individual: '$149.99/month',
          business: '$299.99/month',
          enterprise: '$499.99/month'
        },
        rating: 4.9,
        deployments: 67,
        category: 'E-Commerce'
      },
      {
        id: 'subscription-platform',
        name: 'Subscription Commerce',
        description: 'Recurring revenue platform with subscription management',
        features: ['Subscription Management', 'Billing Automation', 'Customer Portal', 'Analytics'],
        complexity: 'Complex',
        estimatedTime: '5-8 days',
        startingPrice: '$79.99',
        pricingTiers: {
          individual: '$79.99/month',
          business: '$149.99/month',
          enterprise: '$299.99/month'
        },
        rating: 4.8,
        deployments: 143,
        category: 'E-Commerce'
      },
      {
        id: 'dropshipping-hub',
        name: 'Dropshipping Automation',
        description: 'Automated dropshipping with supplier integration and order fulfillment',
        features: ['Supplier Integration', 'Automated Ordering', 'Inventory Sync', 'Profit Analytics'],
        complexity: 'Medium',
        estimatedTime: '4-6 days',
        startingPrice: '$19.99',
        pricingTiers: {
          individual: '$19.99/month',
          business: '$79.99/month',
          enterprise: '$149.99/month'
        },
        rating: 4.6,
        deployments: 201,
        category: 'E-Commerce'
      }
    ]
  },
  education: {
    name: 'Education',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-600',
    description: 'Modern learning platforms and educational tools',
    plugs: [
      {
        id: 'ai-training-generator',
        name: 'AI Training Content Generator',
        description: 'Automated training material creation with AI-powered content generation and assessments',
        features: ['AI Content Creation', 'Quiz Generation', 'Training Materials', 'Voice-over Generation'],
        complexity: 'Medium',
        estimatedTime: '4-6 days',
        startingPrice: '$19.99',
        pricingTiers: {
          individual: '$19.99/month',
          team: '$59.99/month',
          enterprise: '$149.99/month'
        },
        rating: 4.6,
        deployments: 78,
        category: 'Education'
      },
      {
        id: 'tutoring-platform',
        name: 'Online Tutoring Hub',
        description: 'Connect students with tutors through video sessions and scheduling',
        features: ['Video Sessions', 'Scheduling System', 'Payment Processing', 'Progress Tracking'],
        complexity: 'Medium',
        estimatedTime: '4-6 days',
        startingPrice: '$19.99',
        pricingTiers: {
          teacher: '$19.99/month',
          school: '$79.99/month',
          district: '$149.99/month'
        },
        rating: 4.7,
        deployments: 89,
        category: 'Education'
      }
    ]
  },
  healthcare: {
    name: 'Healthcare',
    icon: Heart,
    color: 'from-red-500 to-pink-600',
    description: 'Healthcare management and patient care solutions',
    plugs: [
      {
        id: 'patient-portal',
        name: 'Patient Management Portal',
        description: 'Comprehensive patient records and appointment management system',
        features: ['Patient Records', 'Appointment Scheduling', 'Billing Integration', 'Telehealth'],
        complexity: 'Enterprise',
        estimatedTime: '8-12 days',
        startingPrice: '$149.99',
        pricingTiers: {
          provider: '$149.99/month',
          clinic: '$299.99/month',
          healthSystem: '$499.99/month'
        },
        specialNote: 'Powered by II agent LLM - AI specifically crafted for healthcare sector',
        rating: 4.9,
        deployments: 45,
        category: 'Healthcare'
      }
    ]
  },
  entertainment: {
    name: 'Entertainment',
    icon: Gamepad2,
    color: 'from-yellow-500 to-orange-600',
    description: 'Gaming and entertainment platforms',
    plugs: [
      {
        id: 'gaming-platform',
        name: 'Social Gaming Hub',
        description: 'Multiplayer gaming platform with tournaments and leaderboards',
        features: ['Tournament System', 'Leaderboards', 'Social Features', 'Reward System'],
        complexity: 'Complex',
        estimatedTime: '6-8 days',
        startingPrice: '$79.99',
        pricingTiers: {
          creator: '$79.99/month',
          studio: '$149.99/month',
          network: '$299.99/month'
        },
        rating: 4.6,
        deployments: 78,
        category: 'Entertainment'
      }
    ]
  }
}

export default function LandingPageSamples({ onPlugSelected }) {
  const [selectedCategory, setSelectedCategory] = useState('sports')
  const [selectedPlug, setSelectedPlug] = useState(null)

  const handlePlugSelect = (plug) => {
    setSelectedPlug(plug)
    if (onPlugSelected) {
      onPlugSelected(plug.id)
    }
  }

  const getComplexityColor = (complexity) => {
    switch (complexity.toLowerCase()) {
      case 'simple': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      case 'complex': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      case 'enterprise': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const renderPlugCard = (plug) => (
    <Card 
      key={plug.id}
      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
        selectedPlug?.id === plug.id ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
      onClick={() => handlePlugSelect(plug)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{plug.name}</CardTitle>
            <CardDescription className="text-sm mb-3">{plug.description}</CardDescription>
          </div>
          {selectedPlug?.id === plug.id && (
            <CheckCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
          )}
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{plug.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span>{plug.deployments} deployed</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getComplexityColor(plug.complexity)}>
              {plug.complexity}
            </Badge>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">{plug.startingPrice}</div>
              <div className="text-xs text-gray-500">starting price</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{plug.estimatedTime}</span>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
            <ul className="space-y-1">
              {plug.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs flex items-center space-x-2">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {plug.features.length > 3 && (
                <li className="text-xs text-gray-500">
                  +{plug.features.length - 3} more features
                </li>
              )}
            </ul>
          </div>
          
          <div className="pt-2 border-t">
            <Button 
              className="w-full" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handlePlugSelect(plug)
              }}
            >
              <Rocket className="h-4 w-4 mr-2" />
              Select This Plug
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          What Will We Deploy Today?
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Choose from our collection of ready-to-deploy plugs or let ACHEEVY create something custom for you
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Deploy in minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-green-500" />
            <span>99.9% success rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span>Scalable architecture</span>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 h-auto p-1">
          {Object.entries(plugCategories).map(([key, category]) => (
            <TabsTrigger 
              key={key} 
              value={key} 
              className="flex flex-col items-center space-y-2 p-4 h-auto"
            >
              <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                {React.createElement(category.icon, { className: "h-5 w-5 text-white" })}
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {category.plugs.length} plug{category.plugs.length !== 1 ? 's' : ''}
                </div>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(plugCategories).map(([key, category]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            {/* Category Header */}
            <Card className={`bg-gradient-to-r ${category.color} text-white border-0`}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {React.createElement(category.icon, { className: "h-8 w-8" })}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{category.name}</CardTitle>
                    <CardDescription className="text-white/80 text-lg">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Plugs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.plugs.map(renderPlugCard)}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Selected Plug Summary */}
      {selectedPlug && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900 dark:text-blue-100">
              <Target className="h-5 w-5" />
              <span>Selected: {selectedPlug.name}</span>
            </CardTitle>
            <CardDescription className="text-blue-700 dark:text-blue-300">
              Ready to proceed with deployment configuration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Category:</span>
                  <span className="font-medium">{selectedPlug.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Complexity:</span>
                  <Badge className={getComplexityColor(selectedPlug.complexity)}>
                    {selectedPlug.complexity}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Estimated Time:</span>
                  <span className="font-medium">{selectedPlug.estimatedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-600 dark:text-blue-400">Starting Price:</span>
                  <span className="font-bold text-green-600">{selectedPlug.startingPrice}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button className="w-full">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Configure & Deploy
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Cost Calculator
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

