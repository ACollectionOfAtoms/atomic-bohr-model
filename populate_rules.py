"""
This is a very quick and dirty (!DRY; wet, !explicit; cryptic) script to gather and marry
chem data to use in the bohr planetary atomic model (atomic_rules.json)
Not inteded for re-use.
"""
import json
from lxml import html, etree

def clean_number(string):  # 'clean' up wikipedia table numbers
    string = string.strip()
    if string[-3:] == '(?)':
        string = string[:-3].strip()
    num = int(string)
    return num

tree = etree.parse('edata.html')
table = tree.xpath('//table[@class="wikitable"]/child::node()')
sym_table = tree.xpath('//table[@class="symbols"]/child::node()')

sym_body = sym_table[1].getchildren()[1:]  # skip header row
sym_data = {}
for row in sym_body:
    element_data = []
    for td in row.getchildren():
        if td.text == None:
            element_data.append(td.getchildren()[0].text)
        else:
            element_data.append(td.text)
    sym_data[int(element_data[0])] = element_data[1]
tbody = table[2].getchildren()
data = {}
for row in tbody:
    element_data = []
    for td in row.getchildren():
        if td.text == None:
            element_data.append(td.getchildren()[0].text)
        else:
            element_data.append(td.text)
    data[int(element_data[0])] = {'element_name': element_data[1],
                                  'atomic_symbol': sym_data[int(element_data[0])],
                                  'electron_config': map(clean_number,
                                                         element_data[2].split(','))}
with open('atomic_data.json', 'w') as outfile:
    outfile.write(json.dumps(data, indent=4))
