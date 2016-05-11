package com.smbc.step.plugin;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import com.ibm.ecm.extension.Plugin;
import com.ibm.ecm.extension.PluginAction;
import com.ibm.ecm.extension.PluginFeature;
import com.ibm.ecm.extension.PluginLayout;
import com.ibm.ecm.extension.PluginMenu;
import com.ibm.ecm.extension.PluginMenuType;
import com.ibm.ecm.extension.PluginRequestFilter;
import com.ibm.ecm.extension.PluginResponseFilter;
import com.ibm.ecm.extension.PluginService;
import com.ibm.ecm.extension.PluginServiceCallbacks;
import com.ibm.ecm.extension.PluginViewerDef;

public class SMBCDatePlugin extends Plugin
{
	  public void applicationInit(HttpServletRequest request, PluginServiceCallbacks callbacks)
	    throws Exception
	  {
	  }
//hi naveen
	  //23423424224234   
	  public String getId()
	  {
	    return "DatePlugin";
	  }

	  public String getName(Locale locale)
	  {
	    return " SMBC_Date_Format_Plugin";
	  }

	  public String getVersion()
	  {
	    return "1.0.0";
	  }

	  public String getCopyright()
	  {
	    return "Optionally add a CopyRight statement here";
	  }

	  public String getScript()
	  {
	    return "DatePlugin.js";
	  }

	  public String getDebugScript()
	  {
	    return getScript();
	  }

	  public String getDojoModule()
	  {
	    return "DatePluginDojo";
	  }

	  public String getCSSFileName()
	  {
	    return "DatePlugin.css";
	  }

	  public String getDebugCSSFileName()
	  {
	    return getCSSFileName();
	  }

	  public PluginAction[] getActions()
	  {
	    return new PluginAction[0];
	  }

	

	  public PluginRequestFilter[] getRequestFilters()
	  {
	    return new PluginRequestFilter[0];
	  }

	  public PluginResponseFilter[] getResponseFilters()
	  {
	    return new PluginResponseFilter[0];
	  }

	  public PluginService[] getServices()
	  {
	    return new PluginService[0];
	  }

	  

	  public PluginViewerDef[] getViewers()
	  {
	    return new PluginViewerDef[0];
	  }

	  public PluginLayout[] getLayouts()
	  {
	    return new PluginLayout[0];
	  }

	  public PluginFeature[] getFeatures()
	  {
	    return new PluginFeature[0];
	  }

	  public PluginMenuType[] getMenuTypes()
	  {
	    return new PluginMenuType[0];
	  }

	  public PluginMenu[] getMenus()
	  {
	    return new PluginMenu[0];
	  }
	}