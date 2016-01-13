"""Django_Web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/dev/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin

from react import views as react_views

urlpatterns = [

    url(r'^$',react_views.index,name='index'),
    url(r'^api/$',react_views.api,name='api'),



    url(r'^admin/', admin.site.urls),
    url(r'^add/$',react_views.add,name='add'),
    url(r'^add2/(\d+)/(\d+)/$', react_views.add2, name='add2'),
    url(r'^form/$',react_views.form,name='form'),
    url(r'^js/$',react_views.js,name='js'),
    url(r'^ajax_list/$',react_views.ajax_list,name ='ajax_list'),
    url(r'^ajax_dict/$',react_views.ajax_dict,name ='ajax_dict'),
    url(r'^ajax_json/$',react_views.ajax_json,name ='ajax_json'),
    url(r'^context/$',react_views.context,name='context'),

]
