#coding:utf-8
from django.http import HttpResponse
from django.core.urlresolvers import reverse
from django.shortcuts import render

# Create your views here.

def home(request):
	return render(request,'home.html')

def index(request):
    return HttpResponse("Hello Django")

def add(request):
	a = request.GET['a']
	b = request.GET['b']
	return HttpResponse(str(int(a)+int(b)))

def add2(request,a,b):
	return HttpResponse(str(int(a)+int(b)))
