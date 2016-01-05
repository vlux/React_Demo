import json


def main(url):
    d = {
        "children" :{}
    }
    root = d["children"]
    f = open(url, "r")
    for line in f.readlines():
        byte = int(line.strip())
        l1_scope = (byte/1000 *1000 , byte/1000 *1000 +999)
        l1_name = "%d - %d" %(l1_scope[0], l1_scope[1])
        l2_scope = (byte/100 *100 , byte/100 *100 +99)
        l2_name = "%d - %d" %(l2_scope[0], l2_scope[1])
        l3_scope = (byte/10 *10 , byte/10 *10 +9)
        l3_name = "%d - %d" %(l3_scope[0], l3_scope[1])
        root.setdefault(l1_name, {}).setdefault("name", l1_name)
        l1 = root[l1_name]
        l1.setdefault("children", {}).setdefault(l2_name, {})
        l2 = l1["children"][l2_name]
        l2.setdefault("name", l2_name)
        l2.setdefault("children", {}).setdefault(l3_name, {})
        l3 = l2["children"][l3_name]
        l3.setdefault("name", l3_name)
        l3.setdefault("children", {})
        if not l3["children"].has_key(byte):
            l3["children"][byte] = {
                "name" :byte,
                "size": 1
            }
        else:
            l3["children"][byte]["size"] += 1

    d["children"] = d["children"].values()

    for child in d["children"]:
        child["children"] = child["children"].values()
        for child in child["children"]:
            child["children"] = child["children"].values()
            for child in child["children"]:
                child["children"] = child["children"].values()

    #print json.dumps(d, indent=4)

    f.close()
    name = url[0] +'.json'
    with open(name, "w") as output:
        output.write(json.dumps(d,indent=4))


if __name__ == "__main__":
    main('d.txt')
