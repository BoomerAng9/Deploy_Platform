import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Progress } from '@/components/ui/progress.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { CheckCircle, Circle, Play, Users, Zap, Target, Settings, TestTube, Rocket } from 'lucide-react'
import './App.css'
import PersonalitySelector from './components/PersonalitySelector'
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo'
import StepThree from './components/StepThree'
import StepFour from './components/StepFour'
import StepFive from './components/StepFive'
import StepSix from './components/StepSix'
import StepSeven from './components/StepSeven'
import CorrectedPricingTiers from './components/CorrectedPricingTiers'
import ToolInventory from './components/ToolInventory'
import RequestBreakdownEngine from './components/RequestBreakdownEngine'
import CLIContextAnalysis from './components/CLIContextAnalysis'
import SkeletonToolView from './components/SkeletonToolView'
import UpdatedSportsAnalytics from './components/UpdatedSportsAnalytics'
import CorrectedSamplePlugs from './components/CorrectedSamplePlugs'
import CorrectedCostCalculator from './components/CorrectedCostCalculator'
import PlugDeliverySimulator from './components/PlugDeliverySimulator'
import LandingPageSamples from './components/LandingPageSamples'
import DeploymentPathSelector from './components/DeploymentPathSelector'
import FixedQuoteApprovalStep from './components/FixedQuoteApprovalStep'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [selectedPersonality, setSelectedPersonality] = useState(null)
  const [selectedTier, setSelectedTier] = useState(null)
  const [selectedPlug, setSelectedPlug] = useState(null)
  const [costBreakdown, setCostBreakdown] = useState(null)
  const [selectedUsage, setSelectedUsage] = useState('medium')
  const [deploymentPath, setDeploymentPath] = useState(null)
  const [quickDeployData, setQuickDeployData] = useState(null)
  const [projectData, setProjectData] = useState({})
  const [approvalData, setApprovalData] = useState(null)
  const [showQuoteApproval, setShowQuoteApproval] = useState(false)

  const steps = [
    {
      id: 1,
      title: "Enhanced User Interaction & Consultation",
      description: "AI Personality Selector and requirement gathering",
      icon: Users,
      component: StepOne
    },
    {
      id: 2,
      title: "Enhanced DMAIC Discovery Process",
      description: "Systematic requirement analysis and solution design",
      icon: Target,
      component: StepTwo
    },
    {
      id: 3,
      title: "Enhanced Plug Blueprint Creation",
      description: "Detailed technical blueprint with visual mockups",
      icon: Settings,
      component: StepThree
    },
    {
      id: 4,
      title: "Enhanced Tool Selection from Warehouse",
      description: "Optimal tool selection from 130+ options",
      icon: Zap,
      component: StepFour
    },
    {
      id: 5,
      title: "Enhanced Plug Assembly & Integration",
      description: "Integrate selected tools into functional plug",
      icon: Settings,
      component: StepFive
    },
    {
      id: 6,
      title: "Enhanced Quality Control & Testing",
      description: "Comprehensive validation and testing",
      icon: TestTube,
      component: StepSix
    },
    {
      id: 7,
      title: "Enhanced Delivery & BOOMERANG",
      description: "Deploy and establish continuous improvement",
      icon: Rocket,
      component: StepSeven
    }
  ]

  const handleStepComplete = (stepId, data) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    setProjectData({ ...projectData, [`step${stepId}`]: data })
    
    // Auto-advance to next step
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  // Handle quick deploy submission - advance to quote approval
  const handleQuickDeploySubmit = (data) => {
    setQuickDeployData(data)
    setProjectData({
      ...projectData,
      description: data.description,
      usageTier: data.usageTier,
      complexity: data.usageTier === 'lite' ? 'Simple' : data.usageTier === 'medium' ? 'Medium' : 'Complex',
      category: 'Quick Deploy',
      path: 'quick'
    })
    setShowQuoteApproval(true)
  }

  const progress = (completedSteps.length / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Deploy by ACHIEVEMOR
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg font-medium">
                  What Will We Deploy Today?
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                99.9% Success Rate
              </Badge>
              <Badge variant="outline" className="text-sm">
                Instant - 24 Hour Delivery
              </Badge>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Progress</span>
              <span>{completedSteps.length} of {steps.length} steps completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="start" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 md:grid-cols-10 gap-1 h-auto p-1">
            <TabsTrigger value="start" className="text-xs md:text-sm px-2 py-2">Get Started</TabsTrigger>
            <TabsTrigger value="samples" className="text-xs md:text-sm px-2 py-2">Sample Plugs</TabsTrigger>
            <TabsTrigger value="process" className="text-xs md:text-sm px-2 py-2">7-Step Process</TabsTrigger>
            <TabsTrigger value="calculator" className="text-xs md:text-sm px-2 py-2">Cost Calculator</TabsTrigger>
            <TabsTrigger value="simulator" className="text-xs md:text-sm px-2 py-2">Delivery Simulator</TabsTrigger>
            <TabsTrigger value="pricing" className="text-xs md:text-sm px-2 py-2 md:block hidden">Pricing Tiers</TabsTrigger>
            <TabsTrigger value="tools" className="text-xs md:text-sm px-2 py-2 md:block hidden">Tool Inventory</TabsTrigger>
            <TabsTrigger value="sports" className="text-xs md:text-sm px-2 py-2 md:block hidden">Sports Analytics</TabsTrigger>
            <TabsTrigger value="cli" className="text-xs md:text-sm px-2 py-2 md:block hidden">CLI Analysis</TabsTrigger>
            <TabsTrigger value="overview" className="text-xs md:text-sm px-2 py-2 md:block hidden">Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="start">
            {showQuoteApproval ? (
              <FixedQuoteApprovalStep 
                projectData={projectData}
                onApproval={(approvalData) => {
                  setApprovalData(approvalData)
                  setShowQuoteApproval(false)
                  // Navigate to delivery simulator or next step
                }}
                onBack={() => setShowQuoteApproval(false)}
              />
            ) : (
              <DeploymentPathSelector 
                onPathSelected={setDeploymentPath}
                onQuickDeploySubmit={handleQuickDeploySubmit}
              />
            )}
          </TabsContent>

          <TabsContent value="samples">
            <CorrectedSamplePlugs onPlugSelected={setSelectedPlug} />
          </TabsContent>

          <TabsContent value="process" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Step Navigation */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Process Steps</CardTitle>
                    <CardDescription>
                      Follow the 7-step DMAIC + FDH + LLL methodology
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {steps.map((step, index) => {
                      const Icon = step.icon
                      const isCompleted = completedSteps.includes(step.id)
                      const isCurrent = currentStep === index
                      
                      return (
                        <div
                          key={step.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            isCurrent 
                              ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800' 
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => setCurrentStep(index)}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className={`h-5 w-5 ${isCurrent ? 'text-blue-500' : 'text-gray-400'}`} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${isCurrent ? 'text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-gray-100'}`}>
                              Step {step.id}
                            </p>
                            <p className={`text-xs ${isCurrent ? 'text-blue-700 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                              {step.title}
                            </p>
                          </div>
                          <Icon className={`h-4 w-4 ${isCurrent ? 'text-blue-500' : 'text-gray-400'}`} />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              </div>

              {/* Current Step Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-blue-500" })}
                      <div>
                        <CardTitle className="text-xl">
                          Step {steps[currentStep].id}: {steps[currentStep].title}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {steps[currentStep].description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {React.createElement(steps[currentStep].component, {
                      onComplete: (data) => handleStepComplete(steps[currentStep].id, data),
                      projectData: projectData,
                      selectedPersonality: selectedPersonality,
                      setSelectedPersonality: setSelectedPersonality,
                      selectedTier: selectedTier,
                      setSelectedTier: setSelectedTier
                    })}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculator">
            <CorrectedCostCalculator 
              selectedPlug={selectedPlug}
              onCostCalculated={setCostBreakdown}
            />
          </TabsContent>

          <TabsContent value="simulator">
            <PlugDeliverySimulator 
              selectedPlug={selectedPlug}
              costBreakdown={costBreakdown}
              selectedUsage={selectedUsage}
              projectData={projectData}
            />
          </TabsContent>

          <TabsContent value="pricing">
            <CorrectedPricingTiers 
              selectedTier={selectedTier} 
              setSelectedTier={setSelectedTier} 
            />
          </TabsContent>

          <TabsContent value="tools">
            <ToolInventory />
          </TabsContent>

          <TabsContent value="sports">
            <UpdatedSportsAnalytics />
          </TabsContent>

          <TabsContent value="cli">
            <CLIContextAnalysis 
              projectComplexity={projectData?.step1?.complexity?.value || 'medium'}
              estimatedTokens={projectData?.step2?.breakdown?.totalTokens || 15000}
            />
          </TabsContent>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    <span>Success Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Time</span>
                    <span className="font-semibold">Instant - 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">User Satisfaction</span>
                    <span className="font-semibold text-blue-600">8.5+/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Cost Savings</span>
                    <span className="font-semibold text-purple-600">40%+</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>Key Features</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">DMAIC + FDH + LLL Framework</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">130+ Tool Ecosystem</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Intelligent Internet Integration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">ACP Protocol Audit Trails</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">5-Tier Security Framework</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    <span>Platform Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Total Tools</span>
                    <span className="font-semibold">130+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Subscription Tiers</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Security Levels</span>
                    <span className="font-semibold">5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sample Plugs</span>
                    <span className="font-semibold">6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Starting Price</span>
                    <span className="font-semibold text-green-600">$7/mo</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Deploy Platform Overview</CardTitle>
                <CardDescription>
                  Complete AI automation platform with transparent pricing and enterprise-grade security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Deploy by ACHIEVEMOR represents the pinnacle of AI automation platform engineering, 
                    combining cutting-edge artificial intelligence with enterprise-grade security and 
                    transparent pricing models. Our platform integrates DMAIC methodology, FDH strategic 
                    framework, and LLL tactical reflexes to create a unified approach to automation development.
                  </p>
                  <p>
                    With over 130 specialized tools, 5 subscription tiers starting at just $7/month, 
                    and comprehensive security frameworks supporting everything from basic encryption 
                    to defense-grade implementations, Deploy provides the complete solution for 
                    organizations seeking to transform their operations through intelligent automation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

