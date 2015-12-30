#!/usr/bin/python
#coding = UTF-8

import json

result = []

for i in open("a.txt"):
    result.append(int(i))


my = '{"children":['

for i in range(10):
    my += '{"name":"' + str(i*1000+1)+ '-' + str((i+1)*1000) +'","children":['
    for j in range(10):
        my += '{"name":"' + str(i*1000+j*100+1)+ '-' + str(i*1000+(j+1)*100) +'","children":['
        for k in range(10):
            if k == 9:
                my += '{"name":"' + str(i*1000+j*100+k*10+1)+ '-' + str(i*1000+j*100+(k+1)*10) +'","children":[]}'
            else:
                my += '{"name":"' + str(i*1000+j*100+k*10+1)+ '-' + str(i*1000+j*100+(k+1)*10) +'","children":[]},'
        if j == 9:
            my += ']}]'
        else:
            my += ']},'
    if i == 9:
        my += '}]}'
    else:
        my += '},'

print my

#json.loads(my)
#json.dumps(my)
