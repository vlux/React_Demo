#coding:utf-8
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from django.shortcuts import render

# Create your views here.

def home(request):
	string = 'Hello Yue'
	lis2 = ['Hey','I\'m','List']
	dic = {'a':'Yue','b':'Xuanwu'}
	lis_num = map(str,range(100))
	return render(request,'home.html',{'string':string,'lis1':lis2,'dic':dic,'lis_num':lis_num})

def index(request):
    return HttpResponse("Hello Django")

def add(request):
	a = request.GET['a']
	b = request.GET['b']
	return HttpResponse(str(int(a)+int(b)))

def add2(request,a,b):
	return HttpResponse(str(int(a)+int(b)))

def form(request):
	return render(request,'form.html')

def js(request):
	return render(request,'js.html')
