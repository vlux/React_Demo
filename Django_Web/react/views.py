#coding:utf-8
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.template.loader import render_to_string


import os


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


def ajax_list(request):
    a = range(100)
    return JsonResponse(a, safe=False)

def ajax_dict(request):
    name_dict = {'twz': 'Love python and Django', 'zqxt': 'I am teaching Django'}
    return JsonResponse(name_dict)

def ajax_json(request):
	person_info_dict = [
    	{"name":"xiaoming", "age":20},
    	{"name":"tuweizhong", "age":24},
    	{"name":"xiaoli", "age":33},
	]
	return JsonResponse(person_info_dict,safe = False)



# render the static html to view
def my_view(request):
    context = {'some_key': 'some_value'}
    static_html = '/path/to/static.html'

    if not os.path.exists(static_html):
        content = render_to_string('template.html', context)
        with open(static_html, 'w') as static_file:
            static_file.write(content)

    return render(request, static_html)

# detect the log in repetely
def post_comment(request, new_comment):
    if request.session.get('has_commented', False):
        return HttpResponse("You've already commented.")
    c = comments.Comment(comment=new_comment)
    c.save()
    request.session['has_commented'] = True
    return HttpResponse('Thanks for your comment!')
