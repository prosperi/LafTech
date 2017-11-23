class ApiController < ApplicationController

  def list_counties
    @counties = School.select('county').group('county').all().pluck('county')
    json_response(@counties)
  end

  def list_schools
    @schools = School.joins(:Fact)
    .where(school: {county: params[:county_id]})
    .select('data_school_facts.school_add_city,
             data_school_facts.school_enrollment,
             data_school_facts.grades_offered,
             data_school_facts.dropout_rate,
             data_school_facts.sat_math,
             data_school_facts.sat_reading,
             data_school_facts.sat_writing,
             data_school_facts.website,
             data_school_facts.school_add_city,
             school.school_name,
             school.latitude,
             school.longitude,
             school.state_lea_id
            ')
            .uniq
    # .distinct()
    json_response(@schools)
  end

  def search_schools
    @schools = School.where('school_name LIKE UPPER(?) AND county IS NOT NULL', "%#{params[:query]}%").uniq
    json_response(@schools)
  end

  def school_details
    @schools = School.joins(:Fact)
    .where('school.state_lea_id = ?', params[:school_id])
    .select('data_school_facts.school_add_city,
             data_school_facts.school_enrollment,
             data_school_facts.grades_offered,
             data_school_facts.male,
             data_school_facts.female,
             data_school_facts.dropout_rate,
             data_school_facts.website,
             data_school_facts.school_add_city,
             data_school_facts.telephone_no,
             school.school_name,
             school.county,
             school.latitude,
             school.longitude,
             school.state_lea_id,
             school.lea_type
            ')
    .first
    json_response(@schools)
  end

  def visualization_1
    @fiscal_information = School.joins(:Fiscal, :Fact)
              .select('
                (local_revenue + state_revenue + other_revenue + fed_revenue) AS revenue,
                school.state_lea_id,
                school_name,
                sat_math,
                sat_reading,
                sat_writing
              ')
              .where.not(data_school_facts: { sat_math: nil })
              .where.not(data_school_facts: { sat_reading: nil })
              .where.not(data_school_facts: { sat_writing: nil })
              .order('revenue ASC')
              .all()
    json_response(@fiscal_information)
  end

  def visualization_2
    hash = { a: true, b: false, c: nil }
    json_response([[1,2,3,4], [1,2], hash])
  end

  def visualization_3
    hash = { a: true, b: false, c: nil }
    json_response([[1,2,3,4], [1,2], hash])
  end
end
