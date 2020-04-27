import json
import numpy as np 
import pandas as pd 
import datetime as datetime
import time
import json
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from flask import Flask,request,jsonify
from flask_cors import CORS

app=Flask(__name__)
CORS(app)

def frescoLogin(Username, Password):
	# Main Code Starting from here...
	driver = webdriver.Chrome("F:\\chromedriver.exe")
	driver.get("https://talk.fresco.me/login")
	driver.set_window_size(1920, 1300)
	#Waiting for "Login with Ultimatix" Button..
	time.sleep(3)
	WebDriverWait(driver, 5).until(expected_conditions.element_to_be_clickable((By.XPATH, "//div[@id=\'app\']/div/section/div[2]/a")))
	driver.find_element(By.XPATH, "//div[@id=\'app\']/div/section/div[2]/a").click()
	#Typing Ultimatix username - EmployeeID..
	WebDriverWait(driver, 10).until(expected_conditions.element_to_be_clickable((By.ID, "form1")))
	driver.find_element(By.ID, "form1").send_keys(Username) 
	driver.find_element(By.ID, "proceed-button").click()
	#Click on Password Button instead of Auth...
	WebDriverWait(driver, 10).until(expected_conditions.visibility_of_element_located((By.ID, "password-btn")))
	driver.find_element(By.ID, "password-btn").click()
	#Typing Ultimatix Password...
	WebDriverWait(driver, 30000).until(expected_conditions.element_to_be_clickable((By.ID, "password-login")))
	driver.find_element(By.ID, "password-login").send_keys(Password)
	time.sleep(1)
	driver.find_element(By.ID, "password-login").send_keys(Keys.ENTER)


def customCheckin(empIDList, Batch, thread_name, checkin_question):
	#Clicking on Home icon...
	driver = webdriver.Chrome("F:\\chromedriver.exe")
	driver.find_element(By.CSS_SELECTOR, ".home .injected-svg").click()
	time.sleep(2)
	WebDriverWait(driver, 30).until(expected_conditions.visibility_of_element_located((By.ID, "home-page")))
	#Clicking on Teams icon...
	driver.find_element(By.CSS_SELECTOR, ".teams .injected-svg").click()
	time.sleep(2)
	#Clicking on first Team Chat...
	#Clicking on Team Chat...
	driver.execute_script(" var team_chat = 'TEAM'+arguments[0]; var teamList = document.getElementsByTagName('li'); for(var i=0; i<teamList.length; i++){ var str = teamList[i].firstElementChild.innerText; if(str.includes(team_chat)) teamList[i].firstElementChild.click(); }; ", Batch)
	time.sleep(3)
	#Clicking on mentioned Thread..
	driver.execute_script("var threads = document.getElementsByClassName('link'); for(var i=0; i<threads.length; i++){ if(threads[i].innerText.includes(arguments[0])) threads[i].click(); }; ", thread_name)
	time.sleep(3)
	#Clicking on + button..
	driver.find_element(By.ID, "post-msg-options").click()
	time.sleep(2)
	#Clicking on "Create Check-In" Option...
	driver.find_element(By.ID, "dropdown-list-0").click()
	time.sleep(2)
	#Remove the second Question box..
	driver.execute_script("document.getElementsByClassName('checkin-form')[0].childNodes[1].firstElementChild.childNodes[1].click();")
	#Remove pre-written question...
	driver.execute_script("document.getElementsByTagName('textarea')[1].value='';")
	#Enter check-in question...
	driver.find_element(By.CSS_SELECTOR, ".question").send_keys(checkin_question)
	driver.find_element(By.XPATH, "//button[contains(.,\'NEXT\')]").click()
	#Python part for adding Employees in CheckIn
	#Loop through above list and enter one by one...
	for emp in empIDList:
		driver.find_element(By.XPATH, "//div[2]/input").send_keys(emp)
		time.sleep(2)
		driver.find_element(By.CSS_SELECTOR, "li:nth-child(1) .detail").click()
		driver.execute_script("document.getElementsByClassName('searchForm')[1].value = '';")
		time.sleep(1)
	#Finally click on Submit button..
	time.sleep(1)
	# Submit button
	#driver.find_element(By.XPATH, "//div[2]/div[2]/div/button").click()


# ############# EDIT FROM HERE #################
# #Enter the path where your stored empID.csv
# CSVFolder = #"C:\\Users\\shksh\\Desktop\\EmpID.csv"
# #Enter your Username
# Username = 
# #Enter your Password
# Password =
# #Specify the path for Chromedriver.exe
# driver = webdriver.Chrome("E:\\chromedriver.exe")
# #Enter the thread_name..
# thread_name =
# # Your Question
# checkin_question =
# ## Two lists - Batch and Sub_batch
# #Example
# array = #'{"Batch": ["B", "C"], "Sub_batch": ["A4", "C2", "C3", "C4", "B2"]}'
# #Above Array should be your JSON Arrays

# ############# EDIT FROM HERE #################

# data  = json.loads(array)
# batchList = data['Batch']
# subBatchList = data['Sub_batch']

# empID = pd.read_csv(CSVFolder, sep=';')
# frescoLogin(Username, Password)

# for batch in batchList:
# 	empIDList = []
# 	for sub in subBatchList:
# 		if batch in sub:
# 			empIDList.extend(empID[empID["Sub_batch"] == sub].EmpID.tolist())
# 	customCheckin(empIDList, batch, thread_name, checkin_question)


# API CODE
@app.route('/create', methods=["POST"])
def create():
	batchlist = request.get_json()['batch']
	subbatchlist = request.get_json()['subbatch']
	# ############# EDIT FROM HERE #################
	#Enter the path where your stored empID.csv
	CSVFolder = "C:\\Users\\goldy\\Downloads\\first\\EmpID.csv"
	#Enter your Username
	Username = request.get_json()['name']
	#Enter your Password
	Password = request.get_json()['password']
	#Specify the path for Chromedriver.exe
	driver = webdriver.Chrome("F:\\chromedriver.exe")
	#Enter the thread_name..
	thread_name = request.get_json()['thread']
	# Your Question
	checkin_question = request.get_json()['question']
	## Two lists - Batch and Sub_batch
	#Example
	subBatchList=subbatchlist
	batchList=batchlist
	empID = pd.read_csv(CSVFolder, sep=';')
	frescoLogin(Username, Password)
	for batch in batchList:
		empIDList = []
		for sub in subBatchList:
	  		if batch in sub:
 	   			empIDList.extend(empID[empID["Sub_batch"] == sub].EmpID.tolist())
		customCheckin(empIDList, batch, thread_name, checkin_question)
