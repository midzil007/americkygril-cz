<?php

class Settings
{    
	private $settings = array();
	private $tableKategorie = 'eshop_kategorie';
	private $tableCategories = 'module_eshop_categories';
	private $tableCategoriesOptions = 'module_eshop_categories_options';
	private $tablePriznaky = 'eshop_priznaky';  
	private $tableZnacky = 'module_eshop_Znacky';
	private $tableZnackyRady = 'module_eshop_ZnackyRady';
	private $tableSettings = 'Settings';
	
	public $znackyNode = 8391; 
 
	public function __construct()
    {
        $this->_tableName = 'Settings'; 
        $this->db = Zend_Registry::getInstance()->db;
        $this->tree = Zend_Registry::getInstance()->tree;
        $this->initAll();
    }   
    
    public function initAll()
    {  
    	$this->settings = $this->lSettings = array();  
    	$select =  $this->db->select();
		$select->from($this->_tableName, array( 'variable', 'value', 'formType', 'group', 'options','displayInLeftMenu', 'onlySuperadmin',));    	
		foreach ($this->db->fetchAll($select) as $s)
		{
			$this->settings[$s['group']][] = $s;
			if($s['displayInLeftMenu'])
				$this->lSettings[$s['group']][] = $s;
		}
    }
	
	public function conversionSetting($getObject = false)
	{  
    	$select =  $this->db->select();
		$select->from($this->_tableName, array( 'variable', 'value', 'formType', 'group', 'options','displayInLeftMenu', 'onlySuperadmin','displayInConversion'));    	
		foreach ($this->db->fetchAll($select) as $s)
		{
			if($s['displayInConversion'] == '1')
				$lSettings[$s['variable']] = $s['value'];
		}
		if($getObject)
		{
			return (object) $lSettings;
		}
		else{
			return $lSettings;
		}
    }
	
	public function saveConversion($input)
	{
		$array = $this->conversionSetting();
		foreach ($array as $key => $value) {
			$data = array();
			$data['value'] = $input->$key;
			$where = $this->db->quoteInto(" variable = ? ", $key);
			$this->db->update($this->tableSettings, $data,$where);
		}
		
		return false;
	}
           
    public function eshopSettings()
    {  
    	$select =  $this->db->select();
		$select->from($this->_tableName, array( 'variable', 'value', 'formType', 'group', 'options','displayInLeftMenu', 'onlySuperadmin','displayInConversion'));    	
		foreach ($this->db->fetchAll($select) as $s)
		{
			if($s['displayInLeftMenu'] && !$s['displayInConversion'])
				$lSettings[] = $s;
		}
		return $lSettings;
    }
    
    
    function getAll() {
    	return $this->settings;    	
    }
	
	/**
		pouze nastavení s příznakem levého menu
	*/
	public function getAllLeft()
	{
		return $this->lSettings; 
	}
    
    /**
	 * Vrátí vlasnost se zadaným názvem.
	 */
	function getSetting($name) {
		foreach ($this->settings as $group) {
			foreach ($group as $setting) {
				if ($setting['variable'] == $name){
					return $setting;
				}
			} 
		}
		return null;
	}
		
	/**
	 * Vrátí hodnotu vlastnosti uzlu se zadaným názvem.
	 */
	function getSettingValue($name) {
		$setting = $this->getSetting($name);
		return ($setting) ? $setting['value'] : null;
	}

	public function saveAll($data)
    {
    	
    	foreach ($data as $k => $v){
    		$this->db->update(			
				$this->_tableName,
				array(
					'variable' => $k,
					'value' => $v
				),
				$this->db->quoteInto(" variable = ? ", $k)
			);					
    	}   
    	
    }   
    
    public function saveEshopSettings($input)
    {
    	$this->saveCategories($input);
    	$this->savePriznaky($input);
    	$this->saveZnacky($input);
    	$this->saveAll($input); 
    }
	    
    
    public function saveCategories($input)
    {   
    	$this->db->delete($this->tableCategoriesOptions);
    	$this->db->delete($this->tableCategories);
    	$i = 1;
     	//  pr($input);//  die();//  
		while( $input->{'category_' . $i} )
		{
			if( $input->{'kDelete_' . $i} )
			{
					$i++;
					continue;
			}
			$row = array();
			$id = $input->{'kId_' . $i};
			$id = $id?$id:$i;
			$row['title'] = $input->{'category_' . $i};
			$row['id'] = $option['id_category'] = $id;   
			$row['multioption'] = $input->{'kSelect_' . $i};
			$row['text'] = $input->{'kategorie_' . $i};
			$row['photos'] = $input->{'kPhotos_' . $i.'_title'};
			$j=1;	
			while( $input->{'k_' . $i . '-n_' . $j} )
			{
				
				$ido = $input->{'k_' . $i . '-id_' . $j};   
				if($ido){
					$option['id'] = $ido; 
				}  
				
				$option['title'] = $input->{'k_' . $i . '-n_' . $j};
				$option['photo'] =  $input->{'k_' . $i . '-img_' . $j};  
				$option['text'] =  $input->{'k_' . $i . '-text_' . $j};
				$this->db->insert($this->tableCategoriesOptions,$option);
				//pr($option);
				$j++;
			}
			$i++;
			$this->db->insert($this->tableCategories, $row);
		}
    }
		
	
	public function savePriznaky( $input )
	 {
	   $this->db->delete($this->tablePriznaky);  
	   $i=1;
	 //  pr($input);
	   while( isset($input->{'priznak_' . $i}) )
	   {
		   $row = array();
		       if($input->{'priznakDelete_' . $i} != 1) 
		       {
		      $row['nazev'] = $input->{'priznak_' . $i};
		      $row['popis'] = $input->{'priznak_' . $i .'_popis'};
		      $row['id'] = $input->{'pId_' . $i};
		         unset($input->{'priznak_' . $i});
		    
		   $row['obrazek'] = $input->{'priznakImg_' . $i};

		   
		   if($row['nazev'] OR $row['obrazek'])    {  
		    $this->db->insert($this->tablePriznaky, $row);
		         }
		  }
		  $i++;
	  }
	  
	 }
	
	  
		public function saveZnacky( $input )
		{
			
		    
		}
	
	function addZnackaNode($title, $descr, $descrLong, $logo, $zid){
		$inputContent = new stdClass();  
		$input = new stdClass();
		$input->pageTitle  = $title;
		$inputContent->logoMain = $logo;       
		$inputContent->url = '?znacka=' . $zid;  
		$inputContent->fck_html = $inputContent->html = $descr;    
		//$inputContent->fck_html2 = $inputContent->html2 = $descrLong;     
		
		$newNode = Node::init('FOLDER', $this->znackyNode, $input, $this->view); 
		$content = Content::init('OverviewZnacka', $inputContent, false);	   
		  
		$content->getPropertyByName('logoMain')->value = substr($logo, 1);  
			   
		$this->save($newNode, $content, $inputContent);
		   
	}
	

	function save($newNode, $content, $inputContent){		 
		$err2 = $content->save();	 
    	$this->tree->addNode($newNode, false, false); 
    	$this->tree->pareNodeAndContent($newNode->nodeId, $content->id, $content->_name);   
    	    
	}
	
	public function getPriznaky()
	{
		$select = $this->db->select();
		$select->from($this->tablePriznaky); 
		return $this->db->fetchAll($select);
	}
	
	public function getOptionsByIdCategory($id)
	{
		$select = $this->db->select();
		$select->from($this->tableCategoriesOptions);
		$select->where('id_category =?',$id);
		return $this->db->fetchAll($select);
	}
	
	
	public function getKategorie($options = false)
	{
		$select = $this->db->select();                    
		$select->from($this->tableCategories);
		$categories =  $this->db->fetchAll($select);
		if(!$options){
			return $categories;
		}
		else{
			foreach ($categories as $value) {
				$v = $value;
				$v['options'] = $this->getOptionsByIdCategory($value['id']);
				$returnCat[] = $v;
			}
			return $returnCat; 
		};
	}
	
	public function getZnacky()
	{
		$select = $this->db->select();
		$select->from($this->tableZnacky);
		$select->order('poradi asc');    
		return $this->db->fetchAll($select);	  		
	}
	
	public function getZnackyRady()
	{  
		$select = $this->db->select();
		$select->from($this->tableZnacky);
		$select->order('poradi asc');   
		$z =  $this->db->fetchAll($select);		  
		foreach($z as $f => $zz){  
			$select2 = $this->db->select();
			$select2->from($this->tableZnackyRady);
			$select2->where('zid = ?', $zz['id'] );   
			$select2->order('poradi asc');   
			$z[$f]['rady'] =  $this->db->fetchAll($select2);		
		}	
		return $z;
	}
	
	function saveEmails($input, $emailNodes){
		$tree = Zend_Registry::getInstance()->tree;
		foreach ($emailNodes as $e){
			$ec = $e->getTheRightContent(); 
			$pn = 'title_' . $e->nodeId;
			$pn2 = 'text_' . $e->nodeId;
			$newTitle = $input->$pn;
			$newText = $input->$pn2;
			
			$e->title = $newTitle;
			$ec->getPropertyByName('html')->value = $newText;
			$e->save(); 
			$ec->update(); 
		}  
	}
}

